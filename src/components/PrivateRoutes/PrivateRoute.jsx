// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const parsedUserObj = JSON.parse(localStorage.getItem("styledUser"));

  const [isAuthenticated, setIsAuthenticated] = useState(parsedUserObj?.email);
  const [userData] = useState(parsedUserObj);
  console.log("Fds", isAuthenticated);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!parsedUserObj?.email);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [parsedUserObj]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
