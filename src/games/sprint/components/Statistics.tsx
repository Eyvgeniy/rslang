import * as React from 'react';

interface StatisticsProps {
  answerMistake: Array<object>;
  answerCorrect: Array<object>;
}

const Statistics = (props: StatisticsProps): JSX.Element => (
    <div className="statistic-screen">
    <div className="statistic-blocks">
      <div className="mistake-container">
        <div className='mistake-answer'>
        <span>Ошибся:</span>
        <span className='mistake-count'>0</span>
        </div>
        <div className='mistake-words'>
        
        </div>
      </div>

      <div className="correct-container">
        <div className='correct-answer'>
        <span>Ответил верно:</span>
        <span className='correct-count'>0</span>
        </div>
        <div className='correct-words'>

        </div>
      </div>
      <div className='statistic-buttons'>
        <button className="btn btn-success statistic-button" data-click="return">Новая игра</button>
        <button className="btn btn-success statistic-button" data-click="home">На главную</button>
      </div>
    </div>
  </div>
  );
  

  export default Statistics;


