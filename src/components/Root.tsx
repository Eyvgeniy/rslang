import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import WordsList from './WordsList/WordList';
import GroupNav from './GroupNav';
import { selectPage } from '../slice/words';
import GamesNav from './GamesNav';
import Savanna from '../games/safari/index';

const Root = (): JSX.Element => {
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
    <div className="container">
      <Switch>
        <Route path="/groups">
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
        </Route>
        <Route path="/savanna" component={Savanna} />
      </Switch>
    </div>
  );
};

export default Root;
