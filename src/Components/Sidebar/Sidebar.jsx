import React from "react";
import { NavLink } from "react-router-dom"; // Change from Link to NavLink
import "../../Components/Sidebar/sidebar.css"; // Import CSS for styling

const Sidebar = ({ role }) => {
  return (
    <div className="sidebar">
      {role === "ADMIN" && (
        <>
          <NavLink to="/dashboard/usermanagement">User Management</NavLink>
          <NavLink to="/dashboard/onboarding">Onboarding</NavLink>
          <NavLink to="/dashboard/cost-explorer">Cost Explorer</NavLink>
          <NavLink to="/dashboard/aws-services">AWS Services</NavLink>
        </>
      )}

      {(role === "READONLY" || role === "CUSTOMER") && (
        <>
          <NavLink to="/dashboard/cost-explorer">Cost Explorer</NavLink>
          <NavLink to="/dashboard/aws-services">AWS Services</NavLink>
        </>
      )}
    </div>
  );
};

export default Sidebar;
