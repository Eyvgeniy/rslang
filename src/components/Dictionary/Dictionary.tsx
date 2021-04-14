import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookNav from '../BookNav';
import DictionaryNav from '../DictionaryNav/DictionaryNav';
import WordsList from '../WordsList';
import GamesNav from '../GamesNav';
import GroupNav from '../GroupNav';
import './Dictionary.css';
import { fetchLearnedWords, selectPage } from '../../slice/dictionary';
import wordsApi from '../../api/wordsApi';

const buttonName = 'Восстановить';
const buttonClass = '';

const Dictionary = (): JSX.Element => {
  const dispatch = useDispatch();
  const { user, page, group, words, loading, section, totalCount } = useSelector((state: any) => {
    const user = {
      ...state.user.currentUser,
      token: state.user.token,
    };
    const { page, group, learnedWords, loading, totalCount } = state.dictionary;
    return {
      user,
      page,
      group,
      words: learnedWords,
      loading,
      section: state.dictionary.section,
      totalCount,
    };
  });

  const handleBackPage = () => {
    dispatch(selectPage(page - 1));
  };

  const handleForwardPage = () => {
    dispatch(selectPage(page + 1));
  };

  const isNextPage = totalCount > (page + 1) * 20;
  const isPrevious = page > 0;

  const handleRecoveButton = (user: any) => (wordId: string) => () => {
    wordsApi
      .fetchDeleteUserWord(user, wordId)
      .then(() => dispatch(fetchLearnedWords({ user, page, group, section })));
  };

  const button = !(section === 'learned') && {
    name: buttonName,
    class: buttonClass,
    handler: handleRecoveButton(user),
  };

  React.useEffect(() => {
    dispatch(fetchLearnedWords({ user, page, group, section }));
  }, [group, section, page]);

  return (
    <div className='words-container'>
      <BookNav />
      <GroupNav />
      <DictionaryNav />
      <div className='book book-group1'>
        <h3 className='book-title'>Список слов для изучения</h3>
        <WordsList words={words} loading={loading} button={button} />
        <div className='pages'>
          {isPrevious && <button onClick={handleBackPage}>&#129044;</button>}
          <span>{page}</span>
          {isNextPage && <button onClick={handleForwardPage}>&#129046;</button>}
        </div>
      </div>
      <GamesNav />
    </div>
  );
};

export default Dictionary;
