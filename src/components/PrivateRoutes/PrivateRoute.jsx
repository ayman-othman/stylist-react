// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const parsedUserObj = JSON.parse(localStorage.getItem("user"));

  const [isAuthenticated, setIsAuthenticated] = useState(parsedUserObj?.email);
  const [userData, setUserData] = useState(parsedUserObj);
  console.log("Dddd", parsedUserObj);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!parsedUserObj?.email);
      setUserData(parsedUserObj);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [parsedUserObj, userData]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
