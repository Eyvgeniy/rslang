import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPage, fetchWords } from '../../slice/words';
import wordsApi from '../../api/wordsApi';
import GroupNav from '../GroupNav';
import WordsList from '../WordsList';
import GamesNav from '../GamesNav';
import BookNav from '../BookNav';

const FIRST_PAGE = 0;
const LAST_PAGE = 29;

const Book = (): JSX.Element => {
  const { group, page, loading, words, user } = useSelector((state: any) => {
    const { currentUser, token } = state.user;
    return { ...state.words, user: { token, ...currentUser } };
  });
  const dispatch = useDispatch();

  const handleBackPage = () => {
    if (page === FIRST_PAGE) {
      dispatch(selectPage(LAST_PAGE));
    } else {
      dispatch(selectPage(page - 1));
    }
  };

  const handleForwardPage = () => {
    dispatch(selectPage((page + 1) % 29));
  };

  React.useEffect(() => {
    dispatch(fetchWords({ group, page }));
  }, [group, page]);

  return (
    <div className='words-container'>
      <GroupNav />
      <div className={`book book-group${group}`}>
        <h3 className='book-title'>Список слов для изучения</h3>
        <WordsList words={words} loading={loading} />
        <div className='pages'>
          <button onClick={handleBackPage}>&#129044;</button> <span>{page}</span>{' '}
          <button onClick={handleForwardPage}>&#129046;</button>
        </div>
      </div>
      <GamesNav />
    </div>
  );
};

export default Book;
