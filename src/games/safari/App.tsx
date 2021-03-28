import * as React from 'react';
import cn from 'classnames';
import './App.css';

const question = 'option';
const answers = ['лодка', 'настройка', 'везти', 'этаж'];
const rightAnswer = 2;

const App = (): JSX.Element => {
  const [gameState, setGameState] = React.useState('start');
  const [position, setPosition] = React.useState(100);
  const [clickedAnswer, setClickedAnswer] = React.useState(null);

  const buttonClass = cn('button-answer', { rightAnswer: gameState === 'rightAnswer' });
  const questionClass = cn('safari-question', { questionFall: gameState === 'waitingAnswer' });
  const pageClass = cn('savanna-start-page', { 'page-show ': gameState === 'start' });
  const gameClass = cn('safari-game', { 'game-show': gameState !== 'start' });

  const handleAnswer = (number: number) => (): void => {
    if (number === 2) setGameState('rightAnswer');
  };

  React.useEffect(() => {
    let timeout: number;
    if (gameState === 'rightAnswer') {
      setPosition((currentPosition) => currentPosition - 10);
      timeout = window.setTimeout(() => {
        setGameState('waitingAnswer');
      }, 2000);
    }
    if (gameState === 'waitingAnswer') {
      timeout = window.setTimeout(() => setGameState('rightAnswer'), 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [gameState]);

  return (
    <section className="savanna-main-container" style={{ backgroundPositionY: `${position}%` }}>
      <div className="close-button">
        <span
          className="close-button__text"
          onClick={() => {
            setGameState('start');
            setPosition(100);
          }}
        >
          &times;
        </span>
      </div>
      <div className={pageClass}>
        <div className="welcome-wrapper">
          <h1 className="welcome-wrapper_heading">Саванна</h1>
          <p className="welcome-wrapper_text">
            Тренировка Саванна развивает словарный запас. Чем больше слов ты знаешь, тем легче тебе
            будет общаться.
          </p>
          <button className="welcome-wrapper_start" onClick={() => setGameState('waitingAnswer')}>
            Начать
          </button>
        </div>
      </div>
      <div className={gameClass}>
        <div className={questionClass}>{question}</div>
        <div className="safari-answers">
          {answers.map((answer, i) => {
            if (gameState === 'waitingAnswer') {
              return (
                <div className={buttonClass} key={i + 1} onClick={handleAnswer(i + 1)}>{`${
                  i + 1
                }) ${answer}`}</div>
              );
            }
            return (
              <div
                className={i + 1 === rightAnswer ? buttonClass : 'button-answer'}
                key={i + 1}
                onClick={handleAnswer(i + 1)}
              >{`${i + 1}) ${answer}`}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default App;
