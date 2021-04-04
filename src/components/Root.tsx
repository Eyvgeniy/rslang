import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Book from './Book';
import Statistics from './Statistics/Statistics';
import Savanna from '../games/safari/index';
import CardGame from '../games/cards/index';
import Main from './Main';
import HFTRoute from './HFTRoute';

const Root = (): JSX.Element => (
  <Switch>
    <HFTRoute path="/book" component={Book} />
    <HFTRoute path="/statistics" component={Statistics} />
    <Route path="/savanna" component={Savanna} />
    <Route path="/cardGame" component={CardGame} />
    <HFTRoute path="/" component={Main} />

  </Switch>
);

export default Root;
