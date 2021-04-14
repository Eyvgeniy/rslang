import * as React from "react";
import { useSelector } from "react-redux";
import SprintGame from "./components/SprintGame";
import "./App.css";
import routes from "../../routes";
import Start from "../components/Start/Start";
import { WordModel } from "../../models/Words/WordModel";

const App = (): JSX.Element => {
  const [gameState, setGameState] = React.useState("start");
  const [wordsForGame, setWordsForGame] = React.useState([]as WordModel[]);
  const wordsArr = useSelector((state: any) => state.words);
  React.useEffect(() => {
    fetch(routes.getWords(wordsArr.page, wordsArr.group))
      .then((response) => response.json())
      .then((wordsData) => {
        setWordsForGame(wordsData);
      });
  }, []);

  
  const handleStart = () => {
    setGameState('waitingAnswer');
  }

  return (
    <section className="main-container-sprint">
      <div className="close-button">
        <a href='#/home'>
        <span className="close-button__text">&times;</span>
        </a>
      </div>
      {gameState === "start" ? 
        <Start 
          gameName="Спринт"
          gameDesription="Истинная гонка на проверку знаний. Укажите верно ли указан перевод слова."
          onStartButtonClickHandler={handleStart}
        /> 
      : <SprintGame 
          wordsArr={wordsForGame} 
          gameState={gameState} 
          setGameState={setGameState}
        />
      }
    </section>
  );
};

export default App;