/* eslint-disable no-param-reassign */
// ts-ignore

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

interface RouteMap {
  learned: Function;
  deleted: Function;
  hard: Function;
  [key: string]: Function;
}

const routeMap: RouteMap = {
  learned: routes.getLearnedWords,
  deleted: routes.getDeletedWords,
  hard: routes.getHardWords,
};
export const fetchLearnedWords = createAsyncThunk(
  'dictionary/learnedWords',
  async (
    { user, group, page, section }: { user: any; group?: number; page?: number; section: string },
    { rejectWithValue },
  ): Promise<unknown> => {
    try {
      /* tslint:disable */
      const currentRoute = routeMap[section];
      const response = await axios.get(currentRoute(user.id, page, group), {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return response.data;
      /* tslint:enable */
    } catch (err) {
      const error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState: {
    learnedWords: [],

    section: 'learned',
    totalCount: 0,
    page: 0,
    group: 0,
    loading: 'idle',
    error: null,
  },
  reducers: {
    selectPage(state, action): void {
      state.page = action.payload;
    },
    selectGroup(state, action): void {
      state.group = action.payload;
    },
    selectSection(state, action): void {
      state.section = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLearnedWords.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchLearnedWords.fulfilled, (state, action) => {
      const [responce] = action.payload as any;
      const { paginatedResults, totalCount } = responce;
      state.learnedWords = paginatedResults;
      if (totalCount[0]) {
        state.totalCount = totalCount[0].count;
      } else {
        state.totalCount = 0;
      }
      state.loading = 'idle';
    });
    builder.addCase(fetchLearnedWords.rejected, (state, action) => {
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

export const { selectPage, selectGroup, selectSection } = dictionarySlice.actions;
export default dictionarySlice.reducer;
