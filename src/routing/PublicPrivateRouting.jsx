import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../auth/Login";
import ForgotPassword from "../auth/ForgotPassword";
import { AuthContext } from "../context/AuthContext";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard"
const PublicPrivateRouting = () => {
  const { isLogin } = useContext(AuthContext); // Fixed the case

  // PrivateRoute component for protecting routes
  const PrivateRoute = ({ children }) => {
    return isLogin ? children : <Navigate to="/login" />; // Redirect to login if not logged in
  };
  const PublicRoute = ({ children }) => {
    return !isLogin ? children : <Navigate to="/home" />;
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
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
};

export default PublicPrivateRouting;
