import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
const Dashboard = () => {
  const { logOut } = useContext(AuthContext);
  const gotoLogin = () => {
    logOut();
    <Navigate to="/login" />;
  };
  return (
    <div>
      "This is a Dashoboard Page"
      <button onClick={gotoLogin}>LogOut</button>
    </div>
  );
};

export default Dashboard;
