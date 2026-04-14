import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/sidebar.css";

const Sidebar = ({ role }) => {
  const adminLinks = [
    { to: "/dashboard/usermanagement", label: "User Management" },
    { to: "/dashboard/onboarding", label: "Onboarding" },
    { to: "/dashboard/cost-explorer", label: "Cost Explorer" },
    { to: "/dashboard/aws-services", label: "AWS Services" },
  ];

  const memberLinks = [
    { to: "/dashboard/cost-explorer", label: "Cost Explorer" },
    { to: "/dashboard/aws-services", label: "AWS Services" },
  ];

  const links = role === "ADMIN" ? adminLinks : memberLinks;

  return (
    <div className="sidebar">
      <div className="sidebar-section-label">Workspace</div>
      <div className="sidebar-links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
