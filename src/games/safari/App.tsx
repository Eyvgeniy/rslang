import * as React from 'react';
import cn from 'classnames';
import './App.css';

const question = 'option';
const answers = ['лодка', 'настройка', 'везти', 'этаж'];
const rightAnswer = 2;

const App = (): JSX.Element => {
  const [gameState, setGameState] = React.useState('waitingAnswer');
  const [position, setPosition] = React.useState(100);
  const [clickedAnswer, setClickedAnswer] = React.useState(null);

  const buttonClass = cn('button-answer', { rightAnswer: gameState === 'rightAnswer' });
  const questionClass = cn('safari-question', { questionFall: gameState === 'waitingAnswer' });

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
    } else {
      timeout = window.setTimeout(() => setGameState('rightAnswer'), 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [gameState]);

  return (
    <section className="savanna-main-container" style={{ backgroundPositionY: `${position}%` }}>
      <div className="savanna-start-page">
        <div className="welcome-wrapper">
          <h1 className="welcome-wrapper_heading">Саванна</h1>
          <p className="welcome-wrapper_text">
            Тренировка Саванна развивает словарный запас. Чем больше слов ты знаешь, тем легче тебе
            будет общаться.
          </p>
          <button className="welcome-wrapper_start">Начать</button>
        </div>
      </div>
      <div className="safari-game">
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
