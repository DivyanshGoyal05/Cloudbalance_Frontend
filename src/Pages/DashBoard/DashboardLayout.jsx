
import React from "react";
import { useSelector } from "react-redux"; 
import { Outlet } from "react-router-dom"; 
import "../DashBoard/DashboardLayout.css"; 
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar"; 

const DashboardLayout = () => {
  const { role } = useSelector((state) => state.auth); 

  return (
    <div className="dashboard-layout">
 
      <Header />

      <div className="dashboard-body">
        
        <Sidebar role={role} />

        
        <div className="dashboard-content">
         
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
