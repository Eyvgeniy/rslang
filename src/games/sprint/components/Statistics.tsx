import * as React from 'react';

const Statistics = ({ setState }: { setState: any }): JSX.Element => (
    <div className="statistic-screen">
    <div className="statistic-blocks">
      <div className="mistake-container">
        <span>Ошибся:</span>
        <span className='mistake-answer'>0</span>
      </div>
      <div className='mistake-block'></div>
      <div className="correct-container">
        <span>Ответил верно:</span>
        <span className='correct-answer'>0</span>
      </div>
      <div className='statistic-buttons'>
        <button className="btn btn-success statistic-button" data-click="return">Новая игра</button>
        <button className="btn btn-success statistic-button" data-click="home">На главную</button>
      </div>
    </div>
  </div>
  );
  

  export default Statistics;


