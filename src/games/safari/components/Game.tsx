/* eslint-disable no-param-reassign */
import * as React from 'react';
import cn from 'classnames';
import rafTimeout from '../rafTimeout';

interface GameProps {
  gameState: string;
  setGameState: (state: string) => void;
  setPosition: (cb: (number: number) => number) => void;
}

const defaultState = {
  round: 0,
  lives: 5,
  currentAnswer: 'none',
  questions: [
    {
      question: 'option',
      answers: ['лодка', 'настройка', 'везти', 'этаж'],
      rightAnswer: 1,
    },
    {
      question: 'house',
      answers: ['лодка', 'настройка', 'везти', 'дом'],
      rightAnswer: 3,
    },
    {
      question: 'live',
      answers: ['лодка', 'настройка', 'везти', 'жизнь'],
      rightAnswer: 3,
    },
    {
      question: 'apple',
      answers: ['яблоко', 'настройка', 'везти', 'дом'],
      rightAnswer: 0,
    },
  ],
  uiState: {
    buttons: [{ state: 'common' }, { state: 'common' }, { state: 'common' }, { state: 'common' }],
  },
};

const Game = (props: GameProps): JSX.Element => {
  const { gameState, setGameState, setPosition } = props;
  const [state, setState] = React.useState({ ...defaultState });
  const handleAnswer = (number: number) => (): void => {
    const currentRightAnswer = state.questions[state.round].rightAnswer;
    if (number === currentRightAnswer) {
      setState((currentState) => {
        currentState.uiState = { ...currentState.uiState };
        currentState.uiState.buttons = [...currentState.uiState.buttons];
        currentState.uiState.buttons[number] = { state: 'rightAnswer' };
        return currentState;
      });
      setGameState('rightAnswer');
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

  const questionClass = cn('safari-question', { questionFall: gameState === 'waitingAnswer' });

  const timeoutRef = React.useRef(null);

  React.useEffect(() => {
    if (gameState === 'rightAnswer') {
      setPosition((currentPosition) => currentPosition - 5);
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

    if (gameState === 'waitingAnswer') {
      rafTimeout(
        () => {
          setGameState('rightAnswer');
        },
        5000,
        timeoutRef,
      );
    }

    return () => {
      cancelAnimationFrame(timeoutRef.current);
    };
  }, [gameState, state]);

  const currentRound = state.questions[state.round];
  return (
    <div className="safari-game">
      <div className={questionClass}>{currentRound.question}</div>
      <div className="safari-answers">
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
            <button className={buttonClass} key={i} onClick={handleAnswer(i)}>{`${
              i + 1
            } ${answer}`}</button>
          );
        })}
      </div>
    </div>
  );
};

export default Game;
