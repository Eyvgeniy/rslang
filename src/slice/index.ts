import { combineReducers } from '@reduxjs/toolkit';
import words from './words';
import user from './user';
import dictionary from './dictionary';

const store = combineReducers({
  words,
  user,
  dictionary,
});

export default store;
