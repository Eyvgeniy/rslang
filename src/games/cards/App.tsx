import * as React from 'react';
import { useSelector } from 'react-redux';
import Start from './components/Start';
import CardGame from './components/CardGame';
import './App.css';

const App = (): JSX.Element => {
  const [gameState, setGameState] = React.useState('start');
  //const [position, setPosition] = React.useState(100);
  
  return (
    <section className="main-container" >
      <div className="close-button">
        <span
          className="close-button__text"
          onClick={() => {
            setGameState('start');
          }}
        >
          &times;
        </span>
      </div>
      {gameState === 'start' ? (
        <Start setState={setGameState} />
      ) : (
        <CardGame
          /*gameState={gameState}
          setGameState={setGameState}*/
        />
      )}
    </section>
  );
};

export default App;