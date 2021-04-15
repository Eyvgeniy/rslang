import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../Spinner';
import WordData from '../WordData';

const WordsList = ({
  words,
  loading,
  button,
}: {
  words: any;
  loading: string;
  button: any;
}): JSX.Element => {
  const [active, setActive] = React.useState(null);
  const user = useSelector((state) => state.user.currentUser);

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
    <>
      {words.length === 0 ? (
        'Нет слов'
      ) : (
        <ul className='words-list'>
          {loading === 'idle' ? (
            words.map((word: any, i: number) => {
              const isActive = i === active;
              const liClass = isActive ? 'activeWord' : '';
              return (
                <React.Fragment key={i}>
                  <li className={`collapsible ${liClass}`} onClick={handleWords(i)}>
                    {word.word}
                    {user && word.userWord.difficulty === 'hard' && '__сложное слово__'}
                  </li>
                  {isActive && (
                    <>
                      <WordData word={word} />
                      {button && (
                        <button className={button.class} onClick={button.handler(word._id)}>
                          {button.name}
                        </button>
                      )}
                    </>
                  )}
                </React.Fragment>
              );
            })
          ) : (
            <Spinner />
          )}
        </ul>
      )}
    </>
  );
};

export default WordsList;
