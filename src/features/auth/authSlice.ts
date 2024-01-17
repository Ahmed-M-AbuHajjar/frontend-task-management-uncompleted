import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: { email: string; username: string; token: string } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ email: string; token: string }>) => {
      state.isAuthenticated = true;
      state.user = { email: action.payload.email, username: '', token: action.payload.token };
    },

    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },

    registerSuccess: (state, action: PayloadAction<{ email: string; username: string; token: string }>) => {
      state.isAuthenticated = true;
      state.user = { email: action.payload.email, username: action.payload.username, token: action.payload.token };
    },
  },
});

export const { loginSuccess, logoutSuccess, registerSuccess } = authSlice.actions;
export const authReducer = authSlice.reducer;
