import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginSuccess } from "../redux/actions/authActions";
import "../Styles/LoginPage.css";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("CUSTOMER");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        username,
        password,
        name,
        role,
      });

      const { role: serverRole, token } = response.data;
      localStorage.setItem("authToken", token);
      dispatch(loginSuccess({ username, role: serverRole }));

      if (serverRole === "ADMIN") navigate("/dashboard/usermanagement");
      else if (serverRole === "READONLY") navigate("/dashboard/costexplorer");
      else navigate("/dashboard/aws-services");
    } catch (err) {
      setError(err?.response?.data || "Registration failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="Logo">
          <img src="assets/Images/image.png" alt="CloudBalance Logo" />
        </div>
        <h2>Create your account</h2>
        <form onSubmit={handleSignup}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="READONLY">READONLY</option>
          </select>
          <button type="submit">Sign up</button>
        </form>
        <p style={{ marginTop: "12px" }}>
          Already have an account? <Link to="/">Login</Link>
        </p>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default SignupPage;


