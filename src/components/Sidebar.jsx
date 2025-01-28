import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink, Navigate } from "react-router-dom";
import "./Sidebar.css";

const Dashboard = () => {
  const { logOut } = useContext(AuthContext);

  const gotoLogin = () => {
    logOut();
    <Navigate to="/login" />;
  };

  return (
    <div className="vh-100 sidebarCotainer">
      <div className="d-flex flex-column align-items-center text-white">
        <ul className="fs-5 mt-5 d-flex flex-column gap-4 list-unstyled">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) => `${isActive ? "active-link" : ""}`}
            >
              Dashboard
            </NavLink>
          </li>
          <li>Ecommerce</li>
          <li>Manage Home</li>
          <li>Manage App Users</li>
        </ul>

        <button
          onClick={gotoLogin}
          className="position-absolute bottom-0 border-0 sidebarbutton"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
