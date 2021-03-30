import * as React from 'react';
import './App.css';
import Start from './components/Start';
import Game from './components/Game';

const App = (): JSX.Element => {
  const [gameState, setGameState] = React.useState('start');
  const [position, setPosition] = React.useState(100);

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
      {gameState === 'start' ? (
        <Start setState={setGameState} />
      ) : (
        <Game gameState={gameState} setGameState={setGameState} setPosition={setPosition} />
      )}

      {/* <div className={gameClass}>
        <div className={questionClass}>{question}</div>
        <div className='safari-answers'>
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
      </div> */}
    </section>
  );
};

export default App;
