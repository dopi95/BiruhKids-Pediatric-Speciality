import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        // Verify token is still valid
        const userData = await apiService.getProfile();
        setUser(userData.user || JSON.parse(storedUser));
      } catch (error) {
        // Token invalid, clear storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  };

  const login = async (credentials) => {
    try {
      const response = await apiService.login(credentials);
      const { user: userData, token } = response;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiService.register(userData);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    if (user.role === 'super_admin') return true;
    return user.permissions && user.permissions[permission];
  };

  const isAdmin = () => {
    return user && ['admin', 'super_admin'].includes(user.role);
  };

  const value = {
    user,
    login,
    register,
    logout,
    hasPermission,
    isAdmin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};