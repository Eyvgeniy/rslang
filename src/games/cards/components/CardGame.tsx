import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import Progress from "./Progress";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const CardGame = (): JSX.Element => {
  const [data, setData] = useState([]);
  const [sounds, setSounds] = useState([
    {},
    {
      audio: 'http://eyvgeniy-rslang-be.herokuapp.com/files/01_0005.mp3"',
      id: "5e9f5ee35eb9e72bc21af4a0",
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
        const array = getSound(result);
        setSounds(array.sort(() => Math.random() - 0.5));
      });
  }, [setData, setSounds]);

  function getSound(data: any[]): object[] {
    const arr: Array<object> = [];
    data.forEach((word) => {
      arr.push({
        audio: `http://eyvgeniy-rslang-be.herokuapp.com/${word.audio}`,
        id: `${word.id}`,
      });
    });
    return arr;
  }

  function pressStart(): void {
    play();
  }

  function pressCard(e: any) {
    if (e.target.dataset.id === sounds[0].id) {
      checkCorrectAnswer();
      setCorrectCards([...correctCards, e.target.dataset.id]);
    } else checkErrorAnswer();
  }

  function checkCorrectAnswer(): void {
    playCorrect();
    setSounds([...sounds.slice(1)]);
    setCorrect((prevCorrect) => prevCorrect + 1);
    console.log(sounds[0]);
    setTimeout(() => {
      playNext();
    }, 1000);
    if (sounds[0].audio === undefined) completeGame();
  }

  function checkErrorAnswer(): void {
    playError();
    setIncorrect((prevIncorrect) => prevIncorrect + 1);
  }

  function completeGame(): void {
    setCorrect(0);
    setIncorrect(0);
  }

  return (
    <div className="app">
      <div className="block-game">
        <div className="menu">
          <div>Correct {correct}</div>
          <div><Progress /></div>
          <div className="incorrect">Incorrect {incorrect}</div>
        </div>
        {typeof data !== "undefined" ? (
          <div
            className="d-flex flex-wrap justify-content-around cards"
            onClick={(e) => pressCard(e)}
          >
            {data.map(
              (word, index): JSX.Element => {
                return (
                  <div
                    className={`card mb-3 mr-1  ${
                      correctCards.includes(word.id) ? "correct-card" : ""
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
