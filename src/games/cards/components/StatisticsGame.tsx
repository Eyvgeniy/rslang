import * as React from "react";
import "./style.css";

interface StatisticsGameProps {
  incorrectWords: Array<{ word: string; wordTranslate: string }>;
  correctWords: Array<{ word: string; wordTranslate: string }>;
  seriesLength: number;
}

const Statistics = (props: StatisticsGameProps): JSX.Element => {
  const { incorrectWords, correctWords, seriesLength} = props;

  return (
    <div className="statistic-screen">
      <div className="statistic-blocks">
        <div className="mistake-container">
          <div className="mistake-answer">
            <span>Ошибся: </span>
            <span className="mistake-count">{incorrectWords.length}</span>
          </div>
          <div className="mistake-words">
            {incorrectWords.map(
              (word): JSX.Element => {
                return (
                  <div className="mistake-word">
                    {word.word} - {word.wordTranslate}
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className="correct-container">
          <div className="correct-answer">
            <span>Ответил верно: </span>
            <span className="correct-count">{correctWords.length}</span>
          </div>
          <div className="correct-words">
            {correctWords.map(
              (word): JSX.Element => {
                return (
                  <div className="correct-word">
                    {word.word} - {word.wordTranslate}
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className="statistic-buttons">
          <button
            className="btn btn-secondary statistic-button"
            onClick={() => window.location.reload()}
          >
            Новая игра
          </button>
          <a href="#/home">
            <button className="btn btn-secondary statistic-button">
              На главную
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
