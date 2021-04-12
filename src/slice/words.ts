/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WordModel } from '../models/Words/WordModel';
import { WordsState } from '../models/RootState';
import routes from '../routes';

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

const wordsSlice = createSlice({
  name: 'words',
  initialState: {
    words: [],
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
  },
});

export const { selectPage, selectGroup } = wordsSlice.actions;
export default wordsSlice.reducer;
