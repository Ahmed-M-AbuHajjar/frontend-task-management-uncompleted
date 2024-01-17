import axios from 'axios';

export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

export const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await axios.post('http://localhost:3000/user/login', credentials);
    setAuthToken(response.data.accessToken);
    return Promise.resolve();
  } catch (error: any) {
    return Promise.reject(new Error(error.response?.data?.message || 'Login failed'));
  }
};

export const register = async (credentials: {
    email: string;
    userName: string;
    password: string;
  }) => {
    try {
      const response = await axios.post('http://localhost:3000/user', credentials);
      return response.data;
    } catch (error: any) {
      return Promise.reject(new Error(error.response?.data?.message || 'Registration failed'));
    }
};

