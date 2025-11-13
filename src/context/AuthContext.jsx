import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axiosClient.post('/users/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser({ token });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      return { success: false, message };
    }
  };

  const signup = async (username, email, password) => {
    try {
      const response = await axiosClient.post('/users/signup', {
        username,
        email,
        password,
      });
      return { success: true, message: 'Signup successful! Please login.' };
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed';
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!token;
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
