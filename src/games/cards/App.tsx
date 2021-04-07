import * as React from "react";
import { useSelector } from "react-redux";
import Start from "./components/Start";
import CardGame from "./components/CardGame";
import "./App.css";

const App = (): JSX.Element => {
  const [gameState, setGameState] = React.useState("start");

  return (
    <section className="main-container">
      <div className="close-button">
        <a href='#/home'>
        <span className="close-button__text">&times;</span>
        </a>
      </div>
      {gameState === "start" ? <Start setState={setGameState} /> : <CardGame />}
    </section>
  );
};

export default App;
