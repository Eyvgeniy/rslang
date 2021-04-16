import * as React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { CookiesProvider } from 'react-cookie';
import Root from './Root';
import rootReducer from '../slice';
import './App.css';

const store = configureStore({
  reducer: rootReducer,
});
export type AppDispatch = typeof store.dispatch;

export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}

const App = (): JSX.Element => (
  <CookiesProvider>
    <Provider store={store}>
      <Router>
        <Route path="/" component={Root} />
      </Router>
    </Provider>
  </CookiesProvider>
);
export default App;
