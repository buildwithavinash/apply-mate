import { useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const savedUser = localStorage.getItem("applymate_user");
const savedToken = localStorage.getItem("applymate_token");

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : null);
  const [token, setToken] = useState(savedToken || "");

  const login = ({ user: nextUser, token: nextToken }) => {
    localStorage.setItem("applymate_user", JSON.stringify(nextUser));
    localStorage.setItem("applymate_token", nextToken);
    setUser(nextUser);
    setToken(nextToken);
  };

  const logout = () => {
    localStorage.removeItem("applymate_user");
    localStorage.removeItem("applymate_token");
    setUser(null);
    setToken("");
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
