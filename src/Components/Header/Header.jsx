import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import logo from "/home/divyansh/BootCamp/Frontend/my-cloud-app/src/assets/Images/cloudkeeper.png";
import "../Header/Header.css";
import { FaBars, FaQuestionCircle, FaUserCircle } from "react-icons/fa";
import api from "../../API/axiosConfig";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { username, isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    dispatch(logout());
    await api.post("/api/logout");
    localStorage.clear();
    navigate("/login");
    toast.success("Logout successful");
  };

  return (
    <div className="header">
      <div className="header-left">
        <img src={logo} alt="Cloudkeeper Logo" />

        <button className="menu-toggle">
          <FaBars color="#3498db" />
        </button>
      </div>

      {isLoggedIn && (
        <div className="header-right">
          <div className="user-container">
            <div className="user-avatar">
              <div className="user-avatar">
                <FaUserCircle size={24} color="#3498db" />
              </div>
            </div>
            <div className="user-info">
              <span className="welcome-text">Welcome</span>
              <span className="user-name">{username}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
