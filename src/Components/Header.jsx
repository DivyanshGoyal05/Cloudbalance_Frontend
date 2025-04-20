import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import "../Styles/Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { username, isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="header">
      <div className="header-left">
        {/* Logo - you'll add the actual image */}
        <img
          src="my-cloud-app/src/assets/Images/cloudkeeper.png"
          alt="CloudKeeper"
        />

        {/* Menu toggle button - you'll add the actual icon */}
        <button className="menu-toggle">{/* Menu icon will go here */}</button>
      </div>

      {isLoggedIn && (
        <div className="header-right">
          {/* Extension button */}

          {/* User info */}
          <div className="user-container">
            <div className="user-avatar">
              {/* User avatar or initials will go here */}
            </div>
            <div className="user-info">
              <span className="welcome-text">Welcome</span>
              <span className="user-name"></span>
            </div>
            <span className="help-icon">{/* Help icon will go here */}</span>
          </div>

          {/* Logout button */}
          <button onClick={handleLogout} className="logout-btn">
            {/* Logout icon will go here */}
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
