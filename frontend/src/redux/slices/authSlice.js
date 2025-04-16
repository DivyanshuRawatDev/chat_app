import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../utils/axios';
import { toast } from 'react-toastify';

export const fetchSignupUser = createAsyncThunk(
  'auth/signup',
  async ({ name, email, password }) => {
    try {
      const user = await API.post('/auth/signup', { name, email, password });
      toast.success(user.data.message);
      return user.data;
    } catch (error) {
      console.log(error.message);
      toast.error('Something went wrong');
    }
  }
);

export const fetchLoginUser = createAsyncThunk('auth/login', async ({ email, password }) => {
  try {
    const user = await API.post('/auth/login', { email, password });
    toast.success(user.data.message);
    return user.data;
  } catch (error) {
    console.log(error.message);
  }
});

export const fetchFirebaseSignup = createAsyncThunk('auth/firbasesignup', async (idToken) => {
  try {
    const user = await API.post('/auth/firebase', { idToken });
    toast.success(user.data.message);
    return user.data;
  } catch (error) {
    console.log(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    isLoading: true,
    isError: false,
  },

  extraReducers: (builder) => {
    //----------- Signup ---------------
    builder.addCase(fetchSignupUser.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });

    builder.addCase(fetchSignupUser.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchSignupUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // ------------ Login ------------------
    builder.addCase(fetchLoginUser.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });

    builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload?.user;
      state.isError = false;
    });
    builder.addCase(fetchLoginUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // ------------ Firebase Login ------------------
    builder.addCase(fetchFirebaseSignup.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });

    builder.addCase(fetchFirebaseSignup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload?.user;
      state.isError = false;
    });
    builder.addCase(fetchFirebaseSignup.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default authSlice.reducer;
