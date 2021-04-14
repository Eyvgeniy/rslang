/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WordModel } from '../models/Words/WordModel';
import { WordsState } from '../models/RootState';
import routes from '../routes';
import { CreateUserWordsRequestModel, GetUserWordsRequestModel } from '../models/UserWord/UserWord';
import { UserWordModel } from './../models/UserWord/UserWord';

export const fetchWords = createAsyncThunk(
  'words/fetchStatus',
  async (
    { group, page }: { group: number; page: number },
    { rejectWithValue },
  ): Promise<unknown> => {
    try {
      const response = await fetch(routes.getWords(page, group));
      const words = await response.json();
      return words;
    } catch (err) {
      const error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const getUserWords = createAsyncThunk(
  'userWords/get',
  async (model: GetUserWordsRequestModel, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.getUserWords(model.userId), {
        headers:{
          'Authorization': `Bearer ${model.token}`,
        }
      });
      return response.data;
    } catch (err) {
      const error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const createUserWord = createAsyncThunk(
  'userWords/create',
  async ( model: CreateUserWordsRequestModel, { rejectWithValue }) => {
    try {
      const response = await axios.post(routes.createUserWord(model.userId, model.wordId), model.word, {
        headers:{
          'Authorization': `Bearer ${model.token}`,
        }
      });
      return response.data;
    } catch (err) {
      const error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateUserWord = createAsyncThunk(
  'userWords/update',
  async ( model: CreateUserWordsRequestModel, { rejectWithValue }) => {
    try {
      const response = await axios.put(routes.updateUserWord(model.userId, model.wordId), model.word, {
        headers:{
          'Authorization': `Bearer ${model.token}`,
        }
      });
      return response.data;
    } catch (err) {
      const error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const wordsSlice = createSlice({
  name: 'words',
  initialState: {
    words: [],
    userWords: [],
    userWordsLoading: 'idle',
    allWords: [],
    page: 0,
    group: 0,
    loading: 'idle',
    error: null,
  } as WordsState,
  reducers: {
    selectPage(state, action): void {
      state.page = action.payload;
    },
    selectGroup(state, action): void {
      state.group = action.payload;
    },
  },
  extraReducers: (builder) => {
    //GET WORDS
    builder.addCase(fetchWords.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchWords.fulfilled, (state, action) => {
      const words = action.payload as WordModel[];
      state.words = words;
      state.allWords = [...state.allWords, ...words];
      state.loading = 'idle';
    });
    builder.addCase(fetchWords.rejected, (state, action) => {
      if (action.payload) {
        const payload: { errorMessage: string } = action.payload as {
          errorMessage: string;
        };
        state.error = payload.errorMessage;
      } else {
        state.error = action.error.message;
      }
      state.loading = 'idle';
    });

    //GET USER WORDS
    builder.addCase(getUserWords.pending, (state) => {
      state.userWordsLoading = 'pending';
    });
    builder.addCase(getUserWords.fulfilled, (state, action) => {
      const words = action.payload as UserWordModel[];
      state.userWords = words;
      state.userWordsLoading = 'idle';
    });
    builder.addCase(getUserWords.rejected, (state, action) => {
      if (action.payload) {
        const payload: { errorMessage: string } = action.payload as {
          errorMessage: string;
        };
        state.error = payload.errorMessage;
      } else {
        state.error = action.error.message;
      }
      state.userWordsLoading = 'idle';
    });

    //CREATE USER WORD
    builder.addCase(createUserWord.pending, (state) => {
      state.userWordsLoading = 'pending';
    });
    builder.addCase(createUserWord.fulfilled, (state, action) => {
      const word = action.payload as UserWordModel;
      state.userWords = [...state.userWords, word];
      state.userWordsLoading = 'idle';
    });
    builder.addCase(createUserWord.rejected, (state, action) => {
      if (action.payload) {
        const payload: { errorMessage: string } = action.payload as {
          errorMessage: string;
        };
        state.error = payload.errorMessage;
      } else {
        state.error = action.error.message;
      }
      state.userWordsLoading = 'idle';
    });

    //UPDATE USER WORD
    builder.addCase(updateUserWord.pending, (state) => {
      state.userWordsLoading = 'pending';
    });
    builder.addCase(updateUserWord.fulfilled, (state, action) => {
      const word = action.payload as UserWordModel;
      state.userWords = state.userWords.map((item, index) => {
        if(item.id === word.id) {
          return word;
        }
        return item;
      });
      state.userWordsLoading = 'idle';
    });
    builder.addCase(updateUserWord.rejected, (state, action) => {
      if (action.payload) {
        const payload: { errorMessage: string } = action.payload as {
          errorMessage: string;
        };
        state.error = payload.errorMessage;
      } else {
        state.error = action.error.message;
      }
      state.userWordsLoading = 'idle';
    });
  },
});

export const { selectPage, selectGroup } = wordsSlice.actions;
export default wordsSlice.reducer;
