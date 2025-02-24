import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../auth/Login";
import ForgotPassword from "../auth/ForgotPassword";
import { AuthContext } from "../context/AuthContext";
import Home from "../pages/Home";
import CreateUser from "../pages/CreateUser";
import UpdateUser from "../pages/UpdateUser";
import Dashboard from "../pages/Dashboard";
import Promotions from "../pages/Promotions";
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
          <Route path="/home/promotions" element={<Promotions />} />
          <Route path="/home/createUser" element={<CreateUser />} />
          <Route path="/home/updateUser" element={<UpdateUser />} />
        </Route>
      </Routes>
    </div>
  );
};

export default PublicPrivateRouting;
