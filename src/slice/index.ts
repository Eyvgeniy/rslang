import { combineReducers } from '@reduxjs/toolkit';
import words from './words';
import user from './user';

const store = combineReducers({
  words,
  user
});

export default store;
