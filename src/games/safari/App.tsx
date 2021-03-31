import * as React from 'react';
import { useSelector } from 'react-redux';
import Start from './components/Start';
import Game from './components/Game';
import './App.css';

const App = (): JSX.Element => {
  const [gameState, setGameState] = React.useState('start');
  const [position, setPosition] = React.useState(100);
  const [wrongAnswers, setwrongAnswers] = React.useState(null);

  const words = useSelector((state: any) => state.words);

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
    </section>
  );
};

export default App;
