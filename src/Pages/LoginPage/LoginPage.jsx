import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Images/cloudkeeper.png";
import "../../Pages/LoginPage/LoginPage.css";
import { toast } from "react-toastify";
// const usernmae = "paras";
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
    // debugger;
    try {
      // Make the API call
      const response = await axios.post("http://localhost:8080/api/login", {
        username,
        password,
      });

      const { role, token } = response.data;
      localStorage.setItem("authToken", token);

      dispatch(loginSuccess({ username, role }));

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err?.response?.data || "Login failed. Please try again.");
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
