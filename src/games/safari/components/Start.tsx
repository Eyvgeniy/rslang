import * as React from 'react';

const Start = ({ setState }: { setState: any }): JSX.Element => (
  <div className='savanna-start-page'>
    <div className='welcome-wrapper'>
      <h1 className='welcome-wrapper_heading'>Саванна</h1>
      <p className='welcome-wrapper_text'>
        Тренировка Саванна развивает словарный запас. Чем больше слов ты знаешь, тем легче тебе
        будет общаться.
      </p>
      <button className='welcome-wrapper_start' onClick={() => setState('waitingAnswer')}>
        Начать
      </button>
    </div>
  </div>
);

export default Start;
