import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuthenticate, setIsAuthenticate] = useState(() => {
    // Initialize state from local storage
    const storedValue = localStorage.getItem("isAuthenticate");
    return storedValue === "true";
  });

  useEffect(() => {
    // Update local storage whenever isAuthenticate changes
    localStorage.setItem("isAuthenticate", isAuthenticate);
  }, [isAuthenticate]);

  return (
    <AuthContext.Provider value={{ isAuthenticate, setIsAuthenticate }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
