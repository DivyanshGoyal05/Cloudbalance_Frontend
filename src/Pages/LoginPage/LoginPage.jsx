import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Images/cloudkeeper.png"; // Update the path to your logo
import "../../Pages/LoginPage/LoginPage.css"; // Import the enhanced CSS for login page
import { toast } from "react-toastify";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  });

  const dispatch = useDispatch();

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

      dispatch(loginSuccess({ username, role }));

      // Redirect based on role
      if (role === "ADMIN") {
        navigate("/dashboard/usermanagement");
      } else if (role === "READONLY") {
        navigate("/dashboard");
      } else if (role === "CUSTOMER") {
        navigate("/dashboard");
      } else {
        setError("Unknown role.");
      }
    } catch (err) {
      toast.error(err?.response?.data || "Login failed. Please try again.");
      // setError("Invalid username or password.", err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="Logo">
          <img src={logo} alt="CloudKeeper Logo" />
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
      </div>
    </div>
  );
};

export default LoginPage;
