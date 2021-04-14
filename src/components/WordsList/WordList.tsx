import React from 'react';
import Spinner from '../Spinner';
import WordData from '../WordData';

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
              {isActive && <WordData word={word} />}
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
