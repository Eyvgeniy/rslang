import React, {FunctionComponent} from 'react';
import styles from "./Start.module.scss";

type OnStartButtonClick = () => void;
interface StartProps {
    onStartButtonClickHandler: OnStartButtonClick;
    gameName: string;
    gameDesription: string;
};

const Start: FunctionComponent<StartProps> = ({onStartButtonClickHandler, gameName, gameDesription}) => (
  <div className={styles.startPage}>
    <div className={styles.welcomeWrapper}>
      <h1 className={styles.welcomeWrapperHeading}>{gameName}</h1>
      <p >
        {gameDesription}
      </p>
      <button className={styles.welcomeWrapperStart} onClick={onStartButtonClickHandler}>
        Начать
      </button>
    </div>
  </div>
);

export default Start;
