import React, { createContext, useState } from "react";

// Create context
const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("authToken"));

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setIsLogin(true);
  };

  const logOut = () => {
    localStorage.removeItem("authToken");
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider value={{ isLogin, login, logOut }}>
      {children} {/* Render the child components */}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext }; // Export context and provider
