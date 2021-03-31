import * as React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Root from './Root';
import rootReducer from '../slice';
import './App.css';

const store = configureStore({
  reducer: rootReducer,
});

const App = (): JSX.Element => (
  <Provider store={store}>
    <Router>
      <Route path='/' component={Root} />
    </Router>
  </Provider>
);
export default App;
