import React from 'react';
import Spinner from '../Spinner';

const WordsList = ({ words, loading }: { words: any; loading: string }): JSX.Element => {
  const [active, setActive] = React.useState(null);

  const handleWords = (i: number) => () => {
    setActive((prev: number | null): null | number => {
      if (prev === i) return null;
      return i;
    });
  };

  React.useEffect(() => {
    setActive(null);
  }, []);

  return (
    <ul className='words-list'>
      {loading === 'idle' ? (
        words.map((word: any, i: number) => {
          const isActive = i === active;
          const liClass = isActive ? 'activeWord' : '';
          return (
            <React.Fragment key={i}>
              <li className={`collapsible ${liClass}`} onClick={handleWords(i)}>
                {word.word}
              </li>
              {isActive && (
                <div className='content'>
                  <p>{`Транскрипция ${word.transcription}`}</p>
                  <p>{`Перевод - ${word.wordTranslate}`}</p>
                  <p dangerouslySetInnerHTML={{ __html: `Применение - ${word.textMeaning}` }}></p>
                  <p>{`Применение перевод - ${word.textMeaningTranslate}`}</p>
                  <img
                    className='word-image'
                    src={`https://eyvgeniy-rslang-be.herokuapp.com/${word.image}`}
                    height='300px'
                    width='400px'
                  />
                </div>
              )}
            </React.Fragment>
          );
        })
      ) : (
        <Spinner />
      )}
    </ul>
  );
};

export default WordsList;
