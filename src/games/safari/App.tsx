import * as React from 'react';
import { useSelector } from 'react-redux';
import Start from './components/Start';
import Game from './components/Game';
import './App.css';
import routes from '../../routes';
import getWrongAnswers from '../../getWrongAnswers';

const App = (): JSX.Element => {
  const [gameState, setGameState] = React.useState('start');
  const [position, setPosition] = React.useState(100);
  const [wordsForGame, setWordsForGame] = React.useState([]);

  const words = useSelector((state: any) => state.words);
  React.useEffect(() => {
    fetch(routes.getWords(words.page + 1, words.group))
      .then((response) => response.json())
      .then((wordsData) => {
      //  console.log(wordsData);
        const answersForWords = getWrongAnswers(wordsData, words.words);
        const wordsForCheckWithAnswer = words.words.map(
          ({ word }: { word: string }, i: number) => ({
            question: word,
            ...answersForWords[i],
          }),
        );
        setWordsForGame(wordsForCheckWithAnswer);
      });
  }, []);

   
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
        <Game
          words={wordsForGame}
          gameState={gameState}
          setGameState={setGameState}
          setPosition={setPosition}
        />
      )}
    </section>
  );
};

export default App;
