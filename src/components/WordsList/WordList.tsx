import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Spinner';
import { fetchWords } from '../../slice/words';

const WordsList = (): JSX.Element => {
  const [active, setActive] = React.useState(null);
  const { words, page, group, loading } = useSelector((state: any) => state.words);
  const dispatch = useDispatch();

  const handleWords = (i: number) => () => {
    setActive((prev: number | null): null | number => {
      if (prev === i) return null;
      return i;
    });
  };

  React.useEffect(() => {
    dispatch(fetchWords({ group, page }));
    setActive(null);
  }, [group, page]);

  return (
    <ul className='words-list'>
      {loading === 'idle' ? (
        words.map((word: any, i: number) => {
          const isActive = i === active;
          const liClass = isActive ? 'active' : '';
          return (
            <React.Fragment key={i}>
              <li className={`collapsible ${liClass}`} onClick={handleWords(i)}>
                {word.word}
              </li>
              {isActive && (
                <div className='content'>
                  <p>{`Транскрипция ${word.transcription}`}</p>
                  <p>{`Перевод - ${word.wordTranslate}`}</p>
                  <p>{`Применение - ${word.textMeaning}`}</p>
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
