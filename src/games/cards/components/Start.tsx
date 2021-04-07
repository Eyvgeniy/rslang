import * as React from 'react';

const Start = ({ setState }: { setState: any }): JSX.Element => (
  <div className='start-page'>
    <div className='card-wrapper'>
      <h1 className='card-wrapper_heading'>Карточки</h1>
      <p className='card-wrapper_text'>
      Изучай английсский и живопись вместе. Тренировка улучшает восприятие английсской речи на слух.
      </p>
      <button className='card-wrapper_start' onClick={() => setState('waitingAnswer')}>
        Начать
      </button>
    </div>
  </div>
);

export default Start;
