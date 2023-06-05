import React, { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData) => {
    // 로그인 성공 시 user 정보와 isAuthenticated 상태 갱신
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = useCallback(() => {
    // 로그아웃 성공 시 user 정보와 isAuthenticated 상태 초기화
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};