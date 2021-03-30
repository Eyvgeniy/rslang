import * as React from 'react';
import Safari from '../games/safari';
import routes from '../routes';
import './App.css';

const groups = [
  { name: 'Раздел 1', class: 'link1' },
  { name: 'Раздел 2', class: 'link2' },
  { name: 'Раздел 3', class: 'link3' },
  { name: 'Раздел 4', class: 'link4' },
  { name: 'Раздел 5', class: 'link5' },
  { name: 'Раздел 6', class: 'link6' },
];

const App = (): JSX.Element => {
  const [active, setActive] = React.useState(null);
  const [words, setWords] = React.useState([]);
  const handleWords = (i: number) => () => {
    setActive((prev: number | null): null | number => {
      if (prev === i) return null;
      return i;
    });
  };

  React.useEffect(() => {
    fetch(routes.getWords())
      .then((responce) => responce.json())
      .then((wordsList) => {
        setWords(wordsList);
      });
  }, [words]);
  return (
    <div className="container">
      <div className="book-nav">
        {groups.map((group, i) => (
          <button key={i} className={`book-link ${group.class}`}>
            {group.name}
          </button>
        ))}
      </div>
      <div className="book">
        <ul>
          {words.map((word, i) => {
            const isActive = i === active;
            const liClass = isActive ? 'active' : '';
            return (
              <>
                <li className={`collapsible ${liClass}`} key={i} onClick={handleWords(i)}>
                  {word.word}
                </li>
                {isActive && (
                  <div className="content" key={i + 20}>
                    <p>{`Транскрипция ${word.transcription}`}</p>
                    <p>{`Перевод - ${word.wordTranslate}`}</p>
                    <p>{`Применение - ${word.textMeaning}`}</p>
                    <p>{`Применение перевод - ${word.textMeaningTranslate}`}</p>
                    <img
                      src={`https://eyvgeniy-rslang-be.herokuapp.com/${word.image}`}
                      height="300px"
                      width="400px"
                    />
                  </div>
                )}
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default App;
