"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User, 
  setCookie, 
  getCookie, 
  getCurrentUser, 
  clearAuth,
  isValidEmail,
  validatePassword
} from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 检查认证状态
    const checkAuthStatus = () => {
      const token = getCookie('authToken');
      if (token) {
        const currentUser = getCurrentUser();
        setUser(currentUser);
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 验证邮箱格式
      if (!isValidEmail(email)) {
        return false;
      }

      // 验证密码
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        return false;
      }

      const token = 'mock-jwt-token-' + Date.now();
      
      // 使用 cookies 存储认证信息
      setCookie('authToken', token, 7); // 7天过期
      setCookie('userEmail', email, 7);

      // 检查是否有注册用户信息
      const registeredUser = localStorage.getItem('registeredUser');
      if (registeredUser) {
        const userData = JSON.parse(registeredUser);
        setUser(userData);
      } else {
        setUser({ username: 'User', email });
      }

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 验证邮箱格式
      if (!isValidEmail(email)) {
        return false;
      }

      // 验证密码
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        return false;
      }

      // 保存注册信息
      const userData = { username, email };
      localStorage.setItem('registeredUser', JSON.stringify(userData));

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    clearAuth();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 