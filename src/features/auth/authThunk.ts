import { setAuthToken } from './../../services/authService';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginSuccess, logoutSuccess } from './authSlice';

import axios from 'axios';
const authService = {
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post('http://localhost:3000/user/login',credentials);
      console.log(response)
      return response.data;
    } catch (error:any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },
  logout: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  },
};

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials: { email: string; password: string }, { dispatch }) => {
  try {
    const user = await authService.login(credentials);
    setAuthToken(user.accessToken);
    dispatch(loginSuccess(user));
  } catch (error:any) {
    return error.message;
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { dispatch }) => {
  try {
    await authService.logout();
    dispatch(logoutSuccess());
  } catch (error:any) {
    return error.message;
  }
});
