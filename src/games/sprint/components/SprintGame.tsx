import React, {useState, useEffect} from "react";
import Progress from './Progress';
import useSound from 'use-sound';
import "bootstrap/dist/css/bootstrap.min.css";
import './Style.css';
import GameStatistics from '../../components/Statistics/Statistics'
import { GameType } from './../../../AppConstants';
import { WordModel } from "../../../models/Words/WordModel";

interface GameProps {
  gameState: string;
  setGameState: (state: string) => void;
  wordsArr: Array<WordModel>;
}


function SprintGame(props: GameProps): JSX.Element {
  
  const { wordsArr } = props;
  const [data, setData] = useState([]);
  const [words, setWords] = useState([]);
  const [wordsTranslate, setWordsTranslate] = useState([]);
  const [score, setScore] = useState(0);
  const [iconOneActive, setIconOneActive] = useState(0);
  const [iconTwoActive, setIconTwoActive] = useState(0);
  const [iconThreeActive, setIconThreeActive] = useState(0);
  const [iconsActive, setIconsActive] = useState(0);
  const [level, setLevel] = useState(0);
  const [iconRightActive, setIconRightActive] = useState(0);
  const [iconWrongActive, setIconWrongActive] = useState(0);
  const [borderRightActive, setBorderRightActive] = useState(0);
  const [borderWrongActive, setBorderWrongActive] = useState(0);
  const [playSoundCorrect] = useSound('../../../public/assets/correct.mp3')
  const [playSoundError] = useSound('../../../public/assets/error.mp3')
  const [playSoundLevel] = useSound('../../../public/assets/level.mp3')
  const [playSoundStart] = useSound('../../../public/assets/start.mp3')
  const [startGame, setStartGame] = useState(false)
  const [finishGame, setFinishGame] = useState(false)
  const [answerMistake, setAnswerMistake] = useState([] as WordModel[])
  const [answerCorrect, setAnswerCorrect] = useState([] as WordModel[])

    useEffect(() => {
        fetch('http://eyvgeniy-rslang-be.herokuapp.com/words?group=0&page=0')
            .then(res => res.json())
            .then(result => {
                setData(result);
                getWords(wordsArr)
            });
    }, [setData, setWords])

    function getWords(wordsArr: WordModel[]): void {
        const arrWords: Array<object> = [];
        const arrWordsTranslate: Array<object> = [];
        wordsArr.forEach((word): void => {
          arrWords.push({'id' : `${word.id}`, 'word' : `${word.word}`, 'wordTranslate' : `${word.wordTranslate}`});
          arrWordsTranslate.push({'id' : `${word.id}`, 'wordTranslate' : `${word.wordTranslate}`});
        })
        arrWords.sort(() => Math.random() - 0.5);
        arrWordsTranslate.sort(() => Math.random() - 0.5);
        setWords(arrWords)
        setWordsTranslate(arrWordsTranslate)
        setStartGame(true)
    }

    useEffect(() => {
      if (startGame) playSoundStart();

    }, [startGame]);
    useEffect(() => {
      if (words[0] === undefined) setFinishGame(true);
      console.log(words.length)
    }, [words]);
    

    function getAnswer(ans: boolean): void {
      if((words[0].id === wordsTranslate[0].id) !== ans) {

        answerMistake.push(words[0].word)

        words.splice(0, 1);
        wordsTranslate.splice(0, 1);
        setWords([...words]);
        setWordsTranslate([...wordsTranslate]);
        getScore(false);
        setIconWrongActive(1);
        setBorderWrongActive(1);
        playSoundError();
        setTimeout(() => {
          setIconWrongActive(0);
          setBorderWrongActive(0);
        }, 500);
        console.log('не угадал')
      }    else  if((words[0].id === wordsTranslate[0].id) === ans) {
        answerCorrect.push(words[0])

        words.splice(0, 1);
        wordsTranslate.splice(0, 1);
        setWords([...words]);
        setWordsTranslate([...wordsTranslate]);
        getScore(true);
        setIconRightActive(1);
        setBorderRightActive(1);
        playSoundCorrect();
        setTimeout(() => {
          setIconRightActive(0);
          setBorderRightActive(0);
        }, 500);
        console.log('угадал')
      }

    }

    function getScore(answ: boolean) {
      if(answ === true){
        if(level === 0){
          setScore(score + 10);
        }
        if(level === 1){
          setScore(score + 20);
        }
        if(level === 2){
          setScore(score + 40);
        }
        if(level === 3){
          setScore(score + 80);
        }
        getIcon();  
      }
      if(answ === false){
        setLevel(0);
        setIconsActive(0);
        setIconOneActive(0);
        setIconTwoActive(0);
        setIconThreeActive(0);
      }
    }

    function getIcon(){
      if(level === 3) {
        setIconOneActive(1);
      } else{
        if(iconsActive === 0) {
          setIconOneActive(1);
          setIconsActive(1);
        }
        if (iconOneActive){
          setIconTwoActive(1);
        }
        if (iconTwoActive){
          setIconThreeActive(1);
        }
        if (iconThreeActive){
          setIconsActive(0);
          setIconOneActive(0);
          setIconTwoActive(0);
          setIconThreeActive(0);
          setLevel(level + 1);
          playSoundLevel();
        }
      }
    }

//@ts-ignore
    const upHandler = ({ key }) => {
      if (key === 'ArrowRight') {
        getAnswer(true)
      }
      if (key === 'ArrowLeft') {
        getAnswer(false)
      }
    };

    useEffect(() => {
        window.addEventListener('keyup', upHandler);
        return () => {
          window.removeEventListener('keyup', upHandler);
        };
    });  

  return (
    
    <div className="App">
      {words.length !== 0 ? (
      <div className='sprint-container'>
        <span className="score-count">{score}</span>
        <div className='sprint-card'>
          <div className={(level === 0 && borderRightActive) ? 'sprint-card__header right' : 'sprint-card__header' && (level === 0 && borderWrongActive) ? 'sprint-card__header wrong' : 'sprint-card__header' && (level === 1) ? 'sprint-card__header-yellow' : 'sprint-card__header' && (level === 2) ? 'sprint-card__header-coral' : 'sprint-card__header' && (level === 3) ? 'sprint-card__header-purple' : 'sprint-card__header'}>
            <div className={(level === 3) ? 'header-icon-active' : 'none'}>
              <div className='header__icon active'></div>
            </div>
            <div className={(level === 3) ? 'none' : 'header-icons'}>
              <div className={(iconOneActive) ? 'header__icon active' : 'header__icon'}></div>
              <div className={(iconTwoActive) ? 'header__icon active' : 'header__icon'}></div>
              <div className={(iconThreeActive) ? 'header__icon active' : 'header__icon'}></div>
            </div>
            <div className='header-description'>
              <p className={(level === 1) ? 'header__text-one' : 'none'}>+20 очков за слово</p>
              <p className={(level === 2) ? 'header__text' : 'none'}>+40 очков за слово</p>
              <p className={(level === 3) ? 'header__text' : 'none'}>+80 очков за слово</p>
            </div>
          </div>
          <div className={(borderRightActive) ? 'sprint-card__word right' : 'sprint-card__word' && (borderWrongActive) ? 'sprint-card__word wrong' : 'sprint-card__word' }>
            <div className='sprint-card__level'>
              <div className={(level === 2 || level === 3) ? 'sprint-card__level-three transparent' : 'sprint-card__level-three'}></div>
              <div className='sprint-card__level-one'></div>
              <div className={(level === 1 || level === 2 || level === 3)  ? 'sprint-card__level-two transparent' : 'sprint-card__level-two' }></div>
              <div className={(level === 3) ?  'sprint-card__level-four transparent': 'sprint-card__level-four' }></div>
            </div>
            <p>{words[0].word}</p>
            <p>{wordsTranslate[0].wordTranslate}</p>
            <div className='sprint-card__icon'>
            <div className={(iconRightActive) ? 'sprint-card__icon-right' : 'sprint-card__icon-right transparent'}></div>
            <div className={(iconWrongActive) ? 'sprint-card__icon-wrong' : 'sprint-card__icon-wrong transparent'}></div>
            </div>
          </div>
          <div className={(borderRightActive) ? 'sprint-card__buttons right' : 'sprint-card__buttons' && (borderWrongActive) ? 'sprint-card__buttons wrong' : 'sprint-card__buttons' }>
          <div className='sprint-card__btn-left'>
            <button type="button" className="btn btn-danger" onClick={() => getAnswer(false)}>Нет</button>
            <div className='icon-arrowleft'></div>
          </div>
            <div className='sprint-card__btn-right'>
            <button type="button" className="btn btn-success" onClick={() => getAnswer(true)}>Да</button>
              <div className='icon-arrowright'></div>
            </div>
          </div>
        </div>
      <div className='sprint-timer'>
      <Progress />
      </div>
      </div>
      ) : <GameStatistics mistakesAnswers={answerMistake} correctAnswers={answerCorrect} type={GameType.Sprint} bestSeriesLength={0}/>}
    </div>
    
  );
}

export default SprintGame;