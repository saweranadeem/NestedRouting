import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../auth/Login";
import ForgotPassword from "../auth/ForgotPassword";
import { AuthContext } from "../context/AuthContext";
import Dashboard from "../commonComponents/Dashboard";

const PublicPrivateRouting = () => {
  const { isLogin } = useContext(AuthContext); // Fixed the case

  // PrivateRoute component for protecting routes
  const PrivateRoute = ({ children }) => {
    return isLogin ? children : <Navigate to="/login" />; // Redirect to login if not logged in
  };
  const PublicRoute = ({ children }) => {
    return !isLogin ? children : <Navigate to="/dashboard" />;
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/forgotPassword"
          element={
            <PublicRoute>
              {" "}
              <ForgotPassword />
            </PublicRoute>
          }
        />

        {/* Protecting the Dashboard route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default PublicPrivateRouting;
