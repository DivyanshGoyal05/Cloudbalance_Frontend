import React from "react";
import { Link } from "react-router-dom";
import "../Styles/sidebar.css";

const Sidebar = ({ role }) => {
  return (
    <div className="sidebar">
      {role === "ADMIN" && (
        <>
          <Link to="/dashboard/usermanagement">User Management</Link>
          <Link to="/dashboard/onboarding">Onboarding</Link>
          <Link to="/dashboard/cost-explorer">Cost Explorer</Link>
          <Link to="/dashboard/aws-services">AWS Services</Link>
        </>
      )}

      {(role === "READONLY" || role === "CUSTOMER") && (
        <>
          <Link to="/dashboard/cost-explorer">Cost Explorer</Link>
          <Link to="/dashboard/aws-services">AWS Services</Link>
        </>
      )}
    </div>
  );
};

export default Sidebar;
