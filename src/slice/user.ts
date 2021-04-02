import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserState } from "../models/RootState";
import { GetUserRequestModel, SignInModel, SignInResponseModel, UserModel } from "../models/User/UserModal";
import routes from "../routes";

export const createUser = createAsyncThunk(
    'user/create',
    async (userData: FormData, { rejectWithValue }) => {
      try {
        const response = await axios.post(routes.createUser(), userData);
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

export const signIn = createAsyncThunk(
  'user/signIn',
  async (signInData: SignInModel, { rejectWithValue }) => {
    try {
      const response = await axios.post(routes.signIn(), signInData);
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

export const getUser = createAsyncThunk(
  'user/get',
  async (model: GetUserRequestModel, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.getUser(model.id), {
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
  
const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        token: null,
        refreshToken: null,
        loading: false,
        error: null,
    } as UserState,
    reducers: {
      updateToken(state, action): void {
        state.token = action.payload;
      },
      logOut(state, action){
        state.token = null;
        state.refreshToken = null;
        state.currentUser = null;
      }
    },
    extraReducers: (builder) => {
      //Create User
      builder.addCase(createUser.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(createUser.fulfilled, (state, action) => {
        state.currentUser = action.payload as UserModel;
        state.loading = false;
        state.error = null;
      });
      builder.addCase(createUser.rejected, (state, action) => {
        if (action.payload) {
          const payload = action.payload as string;
          state.error = payload;
        } else {
          state.error = action.error.message;
        }
        state.loading = false;
      });
      //Get User
      builder.addCase(getUser.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getUser.fulfilled, (state, action) => {
        state.currentUser = action.payload as UserModel;
        state.loading = false;
        state.error = null;
      });
      builder.addCase(getUser.rejected, (state, action) => {
        if (action.payload) {
          const payload = action.payload as string;
          state.error = payload;
        } else {
          state.error = action.error.message;
        }
        state.loading = false;
      });
      //SignIn
      builder.addCase(signIn.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(signIn.fulfilled, (state, action) => {
        const {token, refreshToken, userId} = action.payload as SignInResponseModel;
        state.currentUser = {
          ...state.currentUser,
          id: userId
        };
        state.token = token;
        state.refreshToken = refreshToken;
        state.loading = false;
        state.error = null;
      });
      builder.addCase(signIn.rejected, (state, action) => {
        if (action.payload) {
          const payload = action.payload as string;
          state.error = payload;
        } else {
          state.error = action.error.message;
        }
        state.loading = false;
      });
    },
  });

export const { updateToken, logOut } = userSlice.actions;
export default userSlice.reducer;