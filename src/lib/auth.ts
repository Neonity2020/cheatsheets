// 认证相关的工具函数

export interface User {
  username: string;
  email: string;
}

// Cookie 工具函数
export const setCookie = (name: string, value: string, days: number = 7) => {
  if (typeof document !== 'undefined') {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }
};

export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const deleteCookie = (name: string) => {
  if (typeof document !== 'undefined') {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
};

// 认证状态检查
export const isAuthenticated = (): boolean => {
  const token = getCookie('authToken');
  return !!token;
};

// 获取当前用户信息
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  const userEmail = getCookie('userEmail');
  const registeredUser = localStorage.getItem('registeredUser');
  
  if (userEmail) {
    if (registeredUser) {
      try {
        return JSON.parse(registeredUser);
      } catch {
        return { username: 'User', email: userEmail };
      }
    } else {
      return { username: 'User', email: userEmail };
    }
  }
  
  return null;
};

// 清除所有认证信息
export const clearAuth = () => {
  deleteCookie('authToken');
  deleteCookie('userEmail');
  if (typeof window !== 'undefined') {
    localStorage.removeItem('registeredUser');
  }
};

// 验证邮箱格式
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 验证密码强度
export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 6) {
    return { isValid: false, message: '密码至少需要6个字符' };
  }
  return { isValid: true, message: '' };
}; 