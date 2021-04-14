import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookNav from '../BookNav';
import DictionaryNav from '../DictionaryNav/DictionaryNav';
import WordsList from '../WordsList';
import GamesNav from '../GamesNav';
import GroupNav from '../GroupNav';
import './Dictionary.css';
import { fetchLearnedWords } from '../../slice/dictionary';

const Dictionary = (): JSX.Element => {
  const dispatch = useDispatch();
  const { user, page, group, words, loading, section } = useSelector((state: any) => {
    const user = {
      ...state.user.currentUser,
      token: state.user.token,
    };
    const { page, group, learnedWords, loading } = state.dictionary;
    return { user, page, group, words: learnedWords, loading, section: state.dictionary.section };
  });

  React.useEffect(() => {
    dispatch(fetchLearnedWords({ user, page, group, section }));
  }, [group, section]);

  return (
    <div className='words-container'>
      <BookNav />
      <GroupNav />
      <DictionaryNav />
      <div className='book book-group1'>
        <h3 className='book-title'>Список слов для изучения</h3>
        <WordsList words={words} loading={loading} />
        <div className='pages'>
          <button>&#129044;</button> <span>{page}</span> <button>&#129046;</button>
        </div>
      </div>
      <GamesNav />
    </div>
  );
};

export default Dictionary;
