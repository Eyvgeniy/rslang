import * as React from "react";
import { useSelector } from "react-redux";
import Start from "./components/Start";
import SprintGame from "./components/SprintGame";
import "./App.css";
import routes from "../../routes";

const App = (): JSX.Element => {
  const [gameState, setGameState] = React.useState("start");
  const [wordsForGame, setWordsForGame] = React.useState([]);
  const wordsArr = useSelector((state: any) => state.words);
  React.useEffect(() => {
    fetch(routes.getWords(wordsArr.page, wordsArr.group))
      .then((response) => response.json())
      .then((wordsData) => {
        setWordsForGame(wordsData);
      });
  }, []);

  return (
    <section className="main-container-sprint">
      <div className="close-button">
        <a href='#/home'>
        <span className="close-button__text">&times;</span>
        </a>
      </div>
      {gameState === "start" ? <Start setState={setGameState} /> : <SprintGame wordsArr={wordsForGame} gameState={gameState} setGameState={setGameState}/>}
    </section>
  );
};

export default App;