import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import "../Styles/LoginPage.css"; // Import the enhanced CSS for login page

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch(); // Initialize useDispatch hook
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make the API call
      const response = await axios.post("http://localhost:8080/api/login", {
        username,
        password,
      });

      const { role, token } = response.data; // Destructure the role from the response
      localStorage.setItem("authToken", token);

      // Dispatch login action to Redux
      dispatch(loginSuccess({ username, role }));

      // Redirect based on role
      if (role === "ADMIN") {
        navigate("/dashboard/usermanagement");
      } else if (role === "READONLY") {
        navigate("/dashboard/costexplorer");
      } else if (role === "CUSTOMER") {
        navigate("/dashboard/aws-services");
      } else {
        setError("Unknown role.");
      }
    } catch (err) {
      setError("Invalid username or password.", err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="Logo">
          <img
            src="/home/divyansh/BootCamp/Frontend/my-cloud-app/src/Pages/logo_2025-01-30T12_32_13 (copy).png"
            alt="CloudKeeper Logo"
          />
        </div>
        
        <form onSubmit={handleLogin}>
          <label htmlFor="">username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>

        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
