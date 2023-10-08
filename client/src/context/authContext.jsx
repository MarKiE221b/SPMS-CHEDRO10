import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("Access")) || null
  );

  const login = async (inputs) => {
    const res = await makeRequest.post("/auth/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    const res = await makeRequest.get("/auth/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("Access", JSON.stringify(currentUser));
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
