import React, {FunctionComponent} from "react";
import styles from "./GameWrapper.module.scss";
import { GameState } from "../../../AppConstants";
import Start from "../Start/Start";

type onStateChange = (newState: GameState) => void;
type onStartClick = () => void;
type GameWrapperProps = {
  gameName: string;
  gameDesription: string;
  gameState: GameState;
  onStateChangeHandler: onStateChange;
  onStartClickHandler: onStartClick;
};

const GameWrapper: FunctionComponent<GameWrapperProps> = ({gameName, gameDesription, gameState, onStateChangeHandler, onStartClickHandler, children}) => {
  const handleStartClick = () =>{
    onStateChangeHandler(GameState.WaitingAnswer);
    onStartClickHandler();
  }
  return (
    <section className={styles.mainContainer}>
      <div className={styles.closeButton}>
        <a href='#/home'>
          <span
            className={styles.closeButtonText}
            onClick={() => {
              onStateChangeHandler(GameState.Start);
            }}
          >
            &times;
          </span>
        </a>
      </div>
      {gameState === GameState.Start && 
        <Start 
          onStartButtonClickHandler={handleStartClick}
          gameDesription={gameDesription}
          gameName={gameName}
        />
      }
      {gameState !== GameState.Start ?
        children : null
      }
    </section>
  );
};

export default GameWrapper;
