import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Book from './Book';
import Savanna from '../games/safari/index';
import Main from './Main';
import HFTRoute from './HFTRoute';

const Root = (): JSX.Element => (
  <Switch>
    <HFTRoute path="/book" component={Book} />
    <Route path="/savanna" component={Savanna} />
    <HFTRoute path="/" component={Main} />
  </Switch>
);

export default Root;
