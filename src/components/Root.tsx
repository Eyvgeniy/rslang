import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import WordsList from './WordsList/WordList';
import GroupNav from './GroupNav';

const Root = (): JSX.Element => {
  const { group } = useSelector((state: any) => state.words);

  return (
    <div className='container'>
      <Switch>
        <Route path='/groups'>
          <GroupNav />
          <div className={`book book-group${group}`}>
            <WordsList />
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default Root;
