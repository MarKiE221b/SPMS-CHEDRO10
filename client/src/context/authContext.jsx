import { createContext } from "react";
import { makeRequest } from "../axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/authSlice";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  const login = async (inputs) => {
    const res = await makeRequest.post("/auth/login", inputs);
    dispatch(setAuth(res.data.others));
  };

  const logout = async () => {
    const res = await makeRequest.get("/auth/logout");
    dispatch(setAuth(null));
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
