import React, {FunctionComponent} from "react";
import styles from "./GameWrapper.module.scss";
import { GameState } from "../../../AppConstants";
import Start from "../Start/Start";

type GameWrapperProps = {
  gameName: string;
  gameDesription: string;
};

const GameWrapper: FunctionComponent<GameWrapperProps> = ({gameName, gameDesription, children}) => {
  const [gameState, setGameState] = React.useState(GameState.Start);
  const handleStartClick = () =>{
    setGameState(GameState.WaitingAnswer)
  }
  return (
    <section className={styles.mainContainer}>
      <div className={styles.closeButton}>
        <a href='#/home'>
          <span
            className={styles.closeButtonText}
            onClick={() => {
              setGameState(GameState.Start);
            }}
          >
            &times;
          </span>
        </a>
      </div>
      {gameState === GameState.Start ? 
        <Start 
          onStartButtonClickHandler={handleStartClick}
          gameDesription={gameDesription}
          gameName={gameName}
        /> : 
        {children}
      }
    </section>
  );
};

export default GameWrapper;
