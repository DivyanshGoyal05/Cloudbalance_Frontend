import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosConfig";
import { loginSuccess } from "../redux/actions/authActions";
import "../Styles/LoginPage.css";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/register", {
        username,
        password,
        name,
      });

      const { role: serverRole, token } = response.data;
      localStorage.setItem("authToken", token);
      dispatch(loginSuccess({ username, role: serverRole }));

      if (serverRole === "ADMIN") navigate("/dashboard/usermanagement");
      else if (serverRole === "READONLY") navigate("/dashboard/cost-explorer");
      else navigate("/dashboard/usermanagement");
    } catch (err) {
      setError(err?.response?.data || "Registration failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card auth-split-card">
        <section className="auth-panel auth-panel-form">
          <div className="auth-copy">
            <p className="auth-eyebrow">Start with a clean workspace</p>
            <h2>Create your account</h2>
            <p className="auth-subtitle">
              Join CloudBalance and organize your accounts, users, and spend in
              a single place.
            </p>
          </div>
          <div className="Logo">
            <img src="assets/Images/image.png" alt="CloudBalance Logo" />
          </div>
          <form onSubmit={handleSignup} className="auth-form">
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
            <button type="submit">Sign up</button>
          </form>
          <p className="auth-switch">
            Already have an account? <Link to="/">Login</Link>
          </p>
          {error && <p className="auth-error">{error}</p>}
        </section>

        <section className="auth-panel auth-panel-showcase">
          <div className="showcase-orb orb-one" />
          <div className="showcase-orb orb-two" />
          <div className="showcase-orb orb-three" />
          <div className="showcase-content">
            <p className="showcase-kicker">CloudBalance</p>
            <h3>Bring every cloud decision into one visual workspace.</h3>
            <p>
              From onboarding to account access, the platform helps teams act
              faster without losing clarity.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SignupPage;


