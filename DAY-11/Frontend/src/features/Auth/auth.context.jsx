import { createContext, useState, useEffect } from "react";
import {
  login as apiLogin,
  register as apiRegister,
  getMe as apiGetMe,
  logout as apiLogout,
} from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiRegister({ username, email, password });
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiLogin({ email, password });
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const handleGetMe = async () => {
    setLoading(true);

    try {
      const data = await apiGetMe();
      setUser(data.user);
      return data;
    } catch (err) {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      await apiLogout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        handleRegister,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};