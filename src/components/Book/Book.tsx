import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPage } from '../../slice/words';
import GroupNav from '../GroupNav';
import WordsList from '../WordsList';
import GamesNav from '../GamesNav';

const Book = (): JSX.Element => {
  const { group, page } = useSelector((state: any) => state.words);
  const dispatch = useDispatch();

  const handleBackPage = () => {
    if (page === 0) {
      dispatch(selectPage(29));
    } else {
      dispatch(selectPage(page - 1));
    }
  };

  const handleForwardPage = () => {
    dispatch(selectPage((page + 1) % 29));
  };

  return (
    <div className="words-container">
      <GroupNav />
      <div className={`book book-group${group}`}>
        <h3>Список слов</h3>
        <WordsList />
        <div className="pages">
          <button onClick={handleBackPage}>&#129044;</button> <span>{page}</span>{' '}
          <button onClick={handleForwardPage}>&#129046;</button>
        </div>
      </div>
      <GamesNav />
    </div>
  );
};

export default Book;
