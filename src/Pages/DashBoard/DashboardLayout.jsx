// src/Pages/DashboardLayout.jsx
import React from "react";
import { useSelector } from "react-redux"; // for accessing the role from Redux
import { Outlet } from "react-router-dom"; // For displaying child routes
import "../DashBoard/DashboardLayout.css"; // Import CSS
import Header from "../../Components/Header/Header";
// import { Sidebar } from "../Components/Sidebar"; aise kab likhte hai
import Sidebar from "../../Components/Sidebar/Sidebar"; // Import Sidebar component
const DashboardLayout = () => {
  const { role } = useSelector((state) => state.auth); // get the role of the logged-in user

  return (
    <div className="dashboard-layout">
      {/* Header Section */}
      <Header />

      <div className="dashboard-body">
        {/* Sidebar Section */}
        <Sidebar role={role} />

        {/* Main Content Section */}
        <div className="dashboard-content">
          {/* This will render the component for the route that matches */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
