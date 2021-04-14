import React, { FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './statstyle.css';
import { WordModel } from './../../../models/Words/WordModel';
import { GameType, WordDifficulty } from '../../../AppConstants';
import { RootState } from '../../../models/RootState';
import { useAppDispatch } from '../../../components/App';
import { createUserWord, updateUserWord } from '../../../slice/words';
import { CreateUserWordsRequestModel, UserWordCreateUpdateModel, UserWordOptionalModel } from './../../../models/UserWord/UserWord';
import routes from '../../../routes';
import { UserStatisticsModel, UserStatisticsOptionalModel, UserStatisticsRealModel } from '../../../models/UserStatistic/UserStatistic';

interface StatisticsProps {
  mistakesAnswers: WordModel[];
  correctAnswers: WordModel[];
  bestSeriesLength: number;
  type: GameType;
}

const GameStatistics: FunctionComponent<StatisticsProps> = ({mistakesAnswers, correctAnswers, bestSeriesLength, type}): JSX.Element => {

  const dispatch = useAppDispatch();

  const {userWords} = useSelector((state: RootState) => state.words);
  const {currentUser, token} = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if(currentUser === null)
      return;
    async function sendStatistics(word: WordModel, isCorrect: boolean){
      const wordIndex = userWords.findIndex(x => x.wordId === word.id);

      if(wordIndex === -1){
        const model: CreateUserWordsRequestModel = {
          userId: currentUser.id,
          wordId: word.id,
          token: token,
          word: {
            difficulty: WordDifficulty.Normal,
            optional: {
              wrong: isCorrect? 0 : 1,
              right: isCorrect? 1 : 0
            } as UserWordOptionalModel
          } as UserWordCreateUpdateModel 
        }; 
        await dispatch(createUserWord(model));
      }else{
        const userWord = userWords.find(x => x.wordId === word.id);
        const model: CreateUserWordsRequestModel = {
          userId: currentUser.id,
          wordId: word.id,
          token: token,
          word: {
            difficulty: userWord.difficulty,
            optional: {
              wrong: isCorrect? userWord.optional.wrong : userWord.optional.wrong + 1,
              right: isCorrect? userWord.optional.right + 1 : userWord.optional.right
            } as UserWordOptionalModel
          } as UserWordCreateUpdateModel 
        }; 
        await dispatch(updateUserWord(model));  
      }
    }
    mistakesAnswers.forEach(item => {
        sendStatistics(item, false);
    });
    correctAnswers.forEach(item => {
      sendStatistics(item, true);
    });
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    const statisticItem: UserStatisticsOptionalModel = {
      type: type as string,
      seriesLength: bestSeriesLength,
      answerCorrect: correctAnswers.length,
      percentage: Number(((correctAnswers.length/(correctAnswers.length + mistakesAnswers.length)) * 100).toFixed(3)),
      dateTime: dd +'.'+ mm +'.'+ yyyy,
      gamesCount: 1,
      learnWords: [...correctAnswers.map(x => x.id), ...mistakesAnswers.map(x => x.id)]
    }
    axios.get(routes.getUserStatistics(currentUser.id), {
      headers:{
        'Authorization': `Bearer ${token}`,
      }
    }).then(response => {
      const model: UserStatisticsModel = {
        learnedWords: 0,
        optional:{
          savanna:[],
          sprint: [],
          audioChallenge: [],
          cards: []
        }
      }
      if(response.status === 200){
        const realData = response.data as UserStatisticsRealModel;
        const data: UserStatisticsModel = {
          learnedWords: realData.learnedWords,
          optional: realData.optional && realData.optional?.value ? JSON.parse(realData.optional.value) : {}
        };
        const oldStatistics = data.optional?.[type as string]
        model.learnedWords = data.learnedWords;
        model.optional.savanna = data?.optional?.savanna || [];
        model.optional.sprint = data?.optional?.sprint || [];
        model.optional.audioChallenge = data?.optional?.audioChallenge || [];
        model.optional.cards = data?.optional?.cards || [];
        if(oldStatistics){
          const oldItemIndex = oldStatistics.findIndex(x => x.dateTime === statisticItem.dateTime);
          const items = model.optional[type as string];
          if(oldItemIndex === -1){
            items.push(statisticItem); 
          }else{
            const oldItem = oldStatistics[oldItemIndex];
            statisticItem.gamesCount = oldItem.gamesCount + 1;
            statisticItem.answerCorrect += oldItem.answerCorrect;
            statisticItem.seriesLength = oldItem.seriesLength > statisticItem.seriesLength ? oldItem.seriesLength: statisticItem.seriesLength;
            statisticItem.percentage = (oldItem.percentage * oldItem.gamesCount + statisticItem.percentage)/(statisticItem.gamesCount);
            statisticItem.learnWords = [...oldItem.learnWords, ...statisticItem.learnWords];
            model.optional[type as string][oldItemIndex] = statisticItem;
          }
        }else{
          model.optional[type as string].push(statisticItem);
        }
      }else {
        model.optional[type as string] = [statisticItem]
      }
      const realModel: UserStatisticsRealModel = {
        learnedWords: model.learnedWords,
        optional: {value :JSON.stringify(model.optional)}
      }
      axios.put(routes.upsertUserStatistics(currentUser.id), realModel, {
        headers:{
          'Authorization': `Bearer ${token}`,
        }
      })
    }).catch(error => {
      console.log(error);
    });
  }, [currentUser]);

  return (
    <div className="statistic-screen">
      <div className="statistic-blocks">
        <div className="mistake-container">
          <div className='mistake-answer'>
          <span>Ошибся: </span>
          <span className='mistake-count'>{mistakesAnswers.length}</span>
          </div>
          <div className='mistake-words'>
            {mistakesAnswers.map((word): JSX.Element => {
                return (
                  <div className='mistake-word'>{word.word} - {word.wordTranslate}</div>
                );
              })
            }
          </div>
        </div>

        <div className="correct-container">
          <div className='correct-answer'>
          <span>Ответил верно: </span>
          <span className='correct-count'>{correctAnswers.length}</span>
          </div>
          <div className='correct-words'>
            {correctAnswers.map((word): JSX.Element => {
                return (
                  <div className='correct-word'>{word.word} - {word.wordTranslate}</div>
                );
              })
            }
          </div>
        </div>
        <div className='statistic-buttons'>
          <button className="btn btn-secondary statistic-button" onClick={() => window.location.reload()}>Новая игра</button>
          <a href='#/home'><button className="btn btn-secondary statistic-button">На главную</button></a>
        </div>
      </div>
    </div>
  )

}
export default GameStatistics;
