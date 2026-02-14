import React, { createContext, useContext, useState, useMemo } from 'react';
import { loginUser } from '../services/auth';
import useApi from '../hooks/useApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('auth_user');
    return raw ? JSON.parse(raw) : null;
  });

  const { run: doLogin } = useApi(loginUser);

  async function login(email, password) {
    const u = await doLogin(email, password);
    setUser(u);
    localStorage.setItem('auth_user', JSON.stringify(u));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('auth_user');
  }

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
