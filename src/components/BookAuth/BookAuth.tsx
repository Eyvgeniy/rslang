import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPage, fetchWords, getUserWords } from '../../slice/words';
import { UserWordModel } from '../../models/Word/WordModel';
import { WordModel } from '../../models/Words/WordModel';
import wordsApi from '../../api/wordsApi';
import GroupNav from '../GroupNav';
import WordsListAuth from '../WordsListAuth';
import GamesNav from '../GamesNav';
import BookNav from '../BookNav';

const FIRST_PAGE = 0;
const LAST_PAGE = 29;

const Book = (): JSX.Element => {
  const { group, page, loading, words, user } = useSelector((state: any) => {
    const { currentUser, token } = state.user;
    const { words, userWords } = state.words;
    const deletedWords = userWords
      .filter((word: UserWordModel) => word.difficulty === 'easy')
      .map((word: UserWordModel) => word.wordId);

    const existWords = words.filter((word: WordModel) => !deletedWords.includes(word.id));
    const wordsWithUserParams = existWords.map((word: WordModel) => {
      const userWord = userWords.find((el: UserWordModel) => el.wordId === word.id);
      if (userWord) return { ...word, userWord };
      return word;
    });

    return { ...state.words, words: wordsWithUserParams, user: { token, ...currentUser } };
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

  const wordMethods = (user: any) => ({
    setToDeleted: wordsApi.setWordToDeleted(user),
    updateToDeleted: wordsApi.updateWordToDeleted(user),
    setToHard: wordsApi.setWordToHard(user),
    updateToHard: wordsApi.updateWordToHard(user),
  });

  React.useEffect(() => {
    dispatch(fetchWords({ group, page }));
    dispatch(getUserWords(user));
  }, [group, page]);

  return (
    <div className='words-container'>
      <BookNav />
      <GroupNav />
      <div className={`book book-group${group}`}>
        <h3 className='book-title'>Список слов для изучения</h3>
        <WordsListAuth
          words={words}
          loading={loading}
          wordsApi={wordMethods(user)}
          updateUserWords={() => dispatch(getUserWords(user))}
        />
        <div className='pages'>
          <button className='book-btn__left' onClick={handleBackPage}></button> <span>{page}</span>{' '}
          <button className='book-btn__right' onClick={handleForwardPage}></button>
        </div>
      </div>
      <GamesNav />
    </div>
  );
};

export default Book;
