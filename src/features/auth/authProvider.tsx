
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import React, { createContext, useContext, useEffect } from 'react';
import { loginSuccess, logoutSuccess, registerSuccess } from './authSlice';
import { getAuthToken, login as apiLogin, register as apiRegister } from '../../services/authService';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (credentials: { email: string; userName: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    const storedToken = getAuthToken();
    if (storedToken) {
      dispatch(loginSuccess({ email: 'email@example.com', token: storedToken }));
    }
  }, [dispatch]);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      await apiLogin(credentials);
      dispatch(loginSuccess({ email: 'email@example.com', token: getAuthToken() || '' }));
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const register = async (credentials: { email: string; userName: string; password: string }) => {
    try {
      const response = await apiRegister(credentials);
      dispatch(registerSuccess(response));
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    dispatch(logoutSuccess());
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
