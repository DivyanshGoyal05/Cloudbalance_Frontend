import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import "../Styles/Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { username, isLoggedIn, isGuest } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout()); // clear Redux state
    localStorage.clear(); // optional: clear persisted state
    navigate("/"); // redirect to login
  };

  return (
    <div className="header">
      <div className="header-left">
        <img
          src="/assets/Images/image.png"
          alt="CloudBalance"
          className="header-logo"
        />
        <div className="header-brand">
          <span className="header-eyebrow">Cloud cost command center</span>
          <h1>CloudBalance</h1>
        </div>
      </div>

      {isLoggedIn && (
        <div className="header-right">
          <span className="header-user">
            {isGuest ? "Guest Preview" : `Welcome, ${username}`}
          </span>
          <button onClick={handleLogout} className="logout-btn">
            {isGuest ? "Exit Preview" : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
