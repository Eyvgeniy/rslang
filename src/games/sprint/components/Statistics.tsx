import * as React from 'react';
import './statstyle.css';

interface StatisticsProps {
  answerMistake: Array<{word: string; wordTranslate: string}>;
  answerCorrect: Array<{word: string; wordTranslate: string}>;
}

const Statistics = (props: StatisticsProps): JSX.Element => {

  const { answerMistake, answerCorrect } = props;

  return (
    <div className="statistic-screen">
  <div className="statistic-blocks">
    <div className="mistake-container">
      <div className='mistake-answer'>
      <span>Ошибся: </span>
      <span className='mistake-count'>{answerMistake.length}</span>
      </div>
      <div className='mistake-words'>
      {answerMistake.map((word): JSX.Element => {
                return (
                  <div className='mistake-word'>{word.word} - {word.wordTranslate}</div>
                );
              }
            )}
      </div>
    </div>

    <div className="correct-container">
      <div className='correct-answer'>
      <span>Ответил верно: </span>
      <span className='correct-count'>{answerCorrect.length}</span>
      </div>
      <div className='correct-words'>
      {answerCorrect.map((word): JSX.Element => {
                return (
                  <div className='correct-word'>{word.word} - {word.wordTranslate}</div>
                );
              }
            )}
      </div>
    </div>
    <div className='statistic-buttons'>
      <button className="btn btn-secondary statistic-button" onClick={() => window.location.reload()} >Новая игра</button>
      <a href='#/home'><button className="btn btn-secondary statistic-button">На главную</button></a>
    </div>
  </div>
</div>
  )

}
  
  

  export default Statistics;
