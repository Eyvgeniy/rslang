import * as React from 'react';

const Start = ({ setState }: { setState: any }): JSX.Element => (
  <div className='start-page'>
    <div className='card-wrapper'>
      <h1 className='card-wrapper_heading'>Спринт</h1>
      <p className='card-wrapper_text'>
        Истинная гонка на проверку знаний. Укажите верно ли указан перевод слова?
      </p>
      <button className='card-wrapper_start' onClick={() => setState('waitingAnswer')}>
        Начать
      </button>
    </div>
  </div>
);

export default Start;