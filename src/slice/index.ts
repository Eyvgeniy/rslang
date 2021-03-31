import { combineReducers } from '@reduxjs/toolkit';
import words from './words';

const store = combineReducers({
  words,
});

export default store;
