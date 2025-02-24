import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink, Navigate } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  ShoppingCart,
  ExitToApp,
} from "@mui/icons-material";
import "./Sidebar.css";
import logoImage from "../assets/whiteLogo.png";

const Dashboard = () => {
  const { logOut } = useContext(AuthContext);

  const gotoLogin = () => {
    logOut();
    <Navigate to="/login" />;
  };

  return (
    <div className="vh-100 sidebarCotainer">
      {" "}
      <img src={logoImage} height={100} width={100} className="sidebarLogo" />
      <div>
        <ul className="fs-5  d-flex flex-column gap-2 list-unstyled w-100">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active-link" : ""}`
              }
            >
              <DashboardIcon className="me-2" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/home/promotions"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active-link" : ""}`
              }
            >
              <ShoppingCart className="me-2" /> Promotions
            </NavLink>
          </li>
        </ul>

        <button
          onClick={gotoLogin}
          className="position-absolute bottom-0 cursor-pointer border-0 sidebarbutton fs-5"
        >
          <ExitToApp className="me-2" /> Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
