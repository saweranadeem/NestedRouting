import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Home;
