import * as React from "react";
import { useSelector } from "react-redux";
import CardGame from "./components/CardGame";
import "./App.css";
import routes from "../../routes";
import Start from "../components/Start/Start";

const App = (): JSX.Element => {
  const [gameState, setGameState] = React.useState("start");
  const [wordsForGame, setWordsForGame] = React.useState([]);

  const words = useSelector((state: any) => state.words);
  React.useEffect(() => {
    fetch(routes.getWords(words.page, words.group))
      .then((response) => response.json())
      .then((wordsData) => {
        setWordsForGame(wordsData);
      });
  }, []);

  const handleStart = () => {
      setGameState('waitingAnswer');
  }

  return (
    <section className="main-container">
      <div className="close-button">
        <a href="#/home">
          <span className="close-button__text">&times;</span>
        </a>
      </div>
      {gameState === "start" ? 
        <Start 
          gameName="Карточки"
          gameDesription="Изучай английсский и живопись вместе. Тренировка улучшает восприятие английсской речи на слух."
          onStartButtonClickHandler={handleStart}
        /> 
      : <CardGame 
          words={wordsForGame}
          gameState={gameState}
          setGameState={setGameState}
      />}
    </section>
  );
};

export default App;
