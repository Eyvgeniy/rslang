/* eslint-disable no-param-reassign */
import * as React from 'react';
import cn from 'classnames';
import useSound from 'use-sound';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import EndGameModal from './EndGameModal';
import rafTimeout from '../rafTimeout';
import { GameItem } from '../../../getWrongAnswers';

interface GameProps {
  gameState: string;
  setGameState: (state: string) => void;
  setPosition: (cb: (number: number) => number) => void;
  words: GameItem[];
}

const NumberOfLives = 5;

const defaultState = {
  round: 1,
  lives: 5,
  currentAnswer: 'none',
  uiState: {
    buttons: [{ state: 'common' }, { state: 'common' }, { state: 'common' }, { state: 'common' }],
  },
};

const Game = (props: GameProps): JSX.Element => {
  const { gameState, setGameState, setPosition, words } = props;
  const [state, setState] = React.useState({ ...defaultState });
  const [lives, setLives] = React.useState(NumberOfLives);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [playCorrect] = useSound('../../../public/assets/correct.mp3');
  const [playError] = useSound('../../../public/assets/error.mp3');
  const [showModal, setShowModal] = React.useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setGameState('start');
  };
  const handleShowModal = () => setShowModal(true);

  const handleAnswer = (number: number) => (): void => {
    const currentRightAnswer = words[state.round].rightAnswer;
    if (number === currentRightAnswer) {
      setState((currentState) => {
        currentState.uiState = { ...currentState.uiState };
        currentState.uiState.buttons = [...currentState.uiState.buttons];
        currentState.uiState.buttons[number] = { state: 'rightAnswer' };
        return currentState;
      });
      setGameState('rightAnswer');
    } else if (lives === 1) {
      handleShowModal();
      setLives(0);
      setGameState('gameOver');
    } else {
      setState((currentState) => {
        currentState.uiState = { ...currentState.uiState };
        currentState.uiState.buttons = [...currentState.uiState.buttons];
        currentState.uiState.buttons[currentRightAnswer] = { state: 'rightAnswer' };
        currentState.uiState.buttons[number] = { state: 'wrongAnswer' };
        return currentState;
      });
      setGameState('wrongAnswer');
    }
  };

  const handleKeyPress = ({ key }: { key: string }) => {
    if (key === '1' || key === '2' || key === '3' || key === '4') {
      handleAnswer(Number(key) - 1)();
    }
  };

  const hearts = (livesNumber: number) => {
    let heartsArr = [] as Array<JSX.Element>;
    if (livesNumber < NumberOfLives) {
      const emptyHearts = new Array(NumberOfLives - lives).fill(<FontAwesomeIcon icon={faHeart} />);
      heartsArr = [...emptyHearts];
    }
    const fullHearts = new Array(livesNumber).fill(<FontAwesomeIcon icon={fasHeart} />);
    heartsArr = [...heartsArr, ...fullHearts];
    return heartsArr;
  };

  const questionClass = cn('safari-question', { questionFall: gameState === 'waitingAnswer' });

  const timeoutRef = React.useRef(null);

  React.useEffect(() => {
    if (gameState === 'rightAnswer') {
      setPosition((currentPosition) => currentPosition - 5);
      playCorrect();
      setButtonDisabled(true);
      rafTimeout(
        () => {
          setState((currentState) => {
            currentState.uiState.buttons = [...defaultState.uiState.buttons];
            currentState.round += 1;
            return currentState;
          });
          setGameState('waitingAnswer');
        },
        2000,
        timeoutRef,
      );
    }

    if (gameState === 'wrongAnswer') {
      setButtonDisabled(true);
      playError();
      rafTimeout(
        () => {
          setState((currentState) => {
            currentState.uiState.buttons = [...defaultState.uiState.buttons];
            currentState.round += 1;
            return currentState;
          });
          setLives((prev) => prev - 1);
          setGameState('waitingAnswer');
        },
        2000,
        timeoutRef,
      );
    }

    if (gameState === 'waitingAnswer') {
      setButtonDisabled(false);
      rafTimeout(
        () => {
          setGameState('wrongAnswer');
        },
        5000,
        timeoutRef,
      );
    }

    if (gameState === 'gameOver') {
      setPosition(() => 100);
      console.log('gameOver');
    }
    document.addEventListener('keyup', handleKeyPress);

    return () => {
      cancelAnimationFrame(timeoutRef.current);
      document.removeEventListener('keyup', handleKeyPress);
    };
  }, [gameState, state]);

  const currentRound = words[state.round];
  if (!currentRound) return null;
  return (
    <div className='safari-game'>
      <div className='stats'>
        <div>{hearts(lives)}</div>
        <p>{`Раунд ${state.round}`}</p>
      </div>
      <div className={questionClass}>{currentRound.correctWord.word}</div>
      <div className='safari-answers'>
        {currentRound.answers.map((answer, i) => {
          const buttonClass = cn(
            'button-answer',
            {
              rightAnswer: state.uiState.buttons[i].state === 'rightAnswer',
            },
            {
              wrongAnswer: state.uiState.buttons[i].state === 'wrongAnswer',
            },
          );
          return (
            <button
              className={buttonClass}
              key={i}
              disabled={buttonDisabled}
              onClick={handleAnswer(i)}
            >{`${i + 1} ${answer.wordTranslate}`}</button>
          );
        })}
      </div>
      <EndGameModal show={showModal} closeModal={handleCloseModal} />
    </div>
  );
};

export default Game;
