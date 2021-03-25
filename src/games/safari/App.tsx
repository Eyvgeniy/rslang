import * as React from 'react';
import cn from 'classnames';
import './App.css';

const question = 'option';
const answers = ['лодка', 'настройка', 'везти', 'этаж'];

const App = (): JSX.Element => {
  const [state, setState] = React.useState('waitingAnswer');
  const [position, setPosition] = React.useState(100);

  const buttonClass = cn('button-answer', { rightAnswer: state === 'rightAnswer' });

  const handleAnswer = (number: number) => (): void => {
    if (number === 2) setState('rightAnswer');
  };

  React.useEffect(() => {
    let timeout: any;
    if (state === 'waitingAnswer') {
      timeout = setTimeout(() => setPosition((currentPosition) => currentPosition - 10), 5000);
    } else {
      timeout = setTimeout(() => setPosition((currentPosition) => currentPosition - 10), 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [position]);

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
        <div className="safari-question">{question}</div>
        <div className="safari-answers">
          {answers.map((answer, i) => (
            <div className={buttonClass} key={i + 1} onClick={handleAnswer(i + 1)}>{`${
              i + 1
            }) ${answer}`}</div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default App;
