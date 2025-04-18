import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import "../Styles/Header.css"; // Import the updated CSS for the header

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { username, isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout()); // clear Redux state
    localStorage.clear(); // optional: clear persisted state
    navigate("/"); // redirect to login
  };

  return (
    <div className="header">
      <div className="header-left">
        {/* <h2 className="logo">CloudBalance</h2> */}
        <img src="../" alt="CloudKeeper Image" />
      </div>

      {isLoggedIn && (
        <div className="header-right">
          <span>Welcome, {username}!</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
