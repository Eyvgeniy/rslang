import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import useSound from "use-sound";
import Progress from "./Progress";
import "./style.css";
import routes from "../../../routes";

interface GameProps {
  gameState: string;
  setGameState: (state: string) => void;
  words: Array<{ word: string; id: string; image: string; audio: string }>;
}

const CardGame = (props: GameProps): JSX.Element => {
  // const { id } = useSelector((state: any) => state.user.currentUser.id);

  const { words } = props;
  const [data, setData] = useState([]);
  const [correctWords, setCorrectWords] = useState([]);
  const [incorrectWords, setIncorrectWords] = useState([]);
  const [sounds, setSounds] = useState([
    {},
    {
      audio: 'http://eyvgeniy-rslang-be.herokuapp.com/files/01_0005.mp3"',
      id: "5e9f5ee35eb9e72bc21af4a0",
      word: "agree",
    },
  ]);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [play] = useSound(sounds.length > 0 ? sounds[0].audio : "");
  const [playNext] = useSound(
    sounds.length > 1 ? sounds[1].audio : "sounds[0].audio"
  );
  const [playCorrect] = useSound("../../../public/assets/correct.mp3");
  const [playError] = useSound("../../../public/assets/error.mp3");
  const [correctCards, setCorrectCards] = useState([]);

  useEffect(() => {
    fetch("http://eyvgeniy-rslang-be.herokuapp.com/words?group=0&page=0")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        const array = getSound(words);
        setSounds(array.sort(() => Math.random() - 0.5));
      });
  }, [setData, setSounds]);

  function getSound(words: any[]): object[] {
    const arr: Array<object> = [];
    words.forEach((word) => {
      arr.push({
        audio: `http://eyvgeniy-rslang-be.herokuapp.com/${word.audio}`,
        id: `${word.id}`,
        word: `${word.word}`,
      });
    });
    return arr;
  }

  function pressStart(): void {
    play();
  }

  function pressCard(e: any) {
    checkArrayWords(e)
    if (e.target.dataset.id === sounds[0].id) {
      checkCorrectAnswer();
      setCorrectCards([...correctCards, e.target.dataset.id]);
    } else checkErrorAnswer();
  }

  function checkCorrectAnswer(): void {
    playCorrect();
    setSounds([...sounds.slice(1)]);
    setCorrect((prevCorrect) => prevCorrect + 1);
    setTimeout(() => {
      playNext();
    }, 1000);
    if (sounds[0].audio === undefined) completeGame();
  }

  function checkErrorAnswer(): void {
    playError();
    setIncorrect((prevIncorrect) => prevIncorrect + 1);
  }

  function checkArrayWords(e: any) {
    if (e.target.dataset.id === sounds[0].id && !incorrectWords.includes(sounds[0].word)) {
      setCorrectWords([...correctWords, sounds[0].word]);
    } else if (e.target.dataset.id !== sounds[0].id && !incorrectWords.includes(sounds[0].word)) {
      setIncorrectWords([...incorrectWords, sounds[0].word])
    } else return
  }

  function completeGame(): void {
    setCorrect(0);
    setIncorrect(0);
  }

  const sendData = useCallback(() => {
    fetch(routes.updateStatistics("6072a1121f132e00156b2f11"), {
      method: "PUT",
      body: JSON.stringify({
        learnedWords: 20,
        optional: {},
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Result PUT, ", result);
      });
  }, []);

  return (
    <div className="app">
      <div className="block-game">
        <div className="menu">
          <div>Correct {correct}</div>
          <div>
            <Progress />
          </div>
          <div className="incorrect">Incorrect {incorrect}</div>
        </div>
        {typeof words !== "undefined" ? (
          <div
            className="d-flex flex-wrap justify-content-around cards"
            onClick={(e) => pressCard(e)}
          >
            {words.map(
              (word, index): JSX.Element => {
                return (
                  <div
                    className={`card mb-3 mr-1  ${correctCards.includes(word.id) ? "correct-card" : ""
                      }`}
                    key={word.id}
                  >
                    <img
                      src={`http://eyvgeniy-rslang-be.herokuapp.com/${word.image}`}
                      className="img-fluid"
                      alt={`${index}`}
                      data-id={word.id}
                    ></img>
                  </div>
                );
              }
            )}
          </div>
        ) : (
          ""
        )}
        <button
          type="button"
          className="btn btn-secondary d-block mx-auto"
          onClick={pressStart}
        >
          Start game
        </button>
      </div>
    </div>
  );
};

export default CardGame;
