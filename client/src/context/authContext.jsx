import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [duration, setDuration] = useState(null);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("Access")) || null
  );

  const getDuration = async () => {
    try {
      const res = await makeRequest.get("/duration/appDur");
      setDuration(res.data)
    } catch (error) {
    }
  }

  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      inputs,
      {
        withCredentials: true,
      }
    );
    setCurrentUser(res.data);
  };

  const logout = async () => {
    const res = await axios.get("http://localhost:8800/api/auth/logout", {
      withCredentials: true,
    });
    setCurrentUser(null);
  };

  useEffect(() => {
    getDuration();
    localStorage.setItem("Access", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ duration, currentUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
