import React from 'react';
import Spinner from '../Spinner';
import WordData from '../WordData';

const WordsList = ({
  words,
  loading,
  wordsApi,
  updateUserWords,
}: {
  words: any;
  loading: string;
  wordsApi: any;
  updateUserWords: any;
}): JSX.Element => {
  const [active, setActive] = React.useState(null);

  const handleWords = (i: number) => () => {
    setActive((prev: number | null): null | number => {
      if (prev === i) return null;
      return i;
    });
  };

  const handleMethod = (wordId: string, method: any, params?: any) => async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    method(wordId, params).then(() => updateUserWords());
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
          let difficulty = '';
          let deleteMethod;
          let hardMethod;
          if (word.userWord) {
            difficulty = word.userWord.difficulty;
            deleteMethod = wordsApi.updateToDeleted;
            hardMethod = wordsApi.updateToHard;
          } else {
            deleteMethod = wordsApi.setToDeleted;
            hardMethod = wordsApi.setToHard;
          }
          return (
            <React.Fragment key={i}>
              <li className={`collapsible ${liClass}`} onClick={handleWords(i)}>
                {difficulty === 'hard' ? `${word.word}    __сложное слово__` : word.word}
              </li>
              {isActive && (
                <>
                  <WordData word={word} />
                  <button
                    type='button'
                    className='btn btn-danger'
                    onClick={handleMethod(word.id, deleteMethod)}
                  >
                    Удалить из учебника
                  </button>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={handleMethod(word.id, hardMethod, word.userWord)}
                  >
                    Добавить в сложные
                  </button>
                </>
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
