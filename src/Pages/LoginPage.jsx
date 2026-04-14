import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { loginSuccess } from "../redux/actions/authActions";
import "../Styles/LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/login", {
        username,
        password,
      });

      const { role, token } = response.data;
      localStorage.setItem("authToken", token);

      dispatch(loginSuccess({ username, role }));

      if (role === "ADMIN") {
        navigate("/dashboard/aws-services");
      } else if (role === "READONLY") {
        navigate("/dashboard/cost-explorer");
      } else if (role === "CUSTOMER") {
        navigate("/dashboard/usermanagement");
      } else {
        setError("Unknown role.");
      }
    } catch (err) {
      setError("Invalid username or password.", err);
    }
  };

  const handleGuestAccess = () => {
    localStorage.removeItem("authToken");
    dispatch(
      loginSuccess({
        username: "guest.demo",
        role: "ADMIN",
        token: null,
        isGuest: true,
      })
    );
    navigate("/dashboard/usermanagement");
  };

  return (
    <div className="login-container">
      <div className="login-card auth-split-card">
        <section className="auth-panel auth-panel-form">
          <div className="auth-copy">
            <p className="auth-eyebrow">Visibility over waste</p>
            <h2>Login to view your potential savings</h2>
            <p className="auth-subtitle">
              Track accounts, review spend, and keep every team aligned from one
              calm dashboard.
            </p>
          </div>
          <div className="Logo">
            <img src="assets/Images/image.png" alt="CloudBalance Logo" />
          </div>
          <form onSubmit={handleLogin} className="auth-form">
            <label htmlFor="login-username">Username</label>
            <input
              id="login-username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <button
              type="button"
              className="guest-button"
              onClick={handleGuestAccess}
            >
              Continue as Guest
            </button>
          </form>
          <p className="auth-switch">
            New here? <Link to="/signup">Create an account</Link>
          </p>

          {error && <p className="auth-error">{error}</p>}
        </section>

        <section className="auth-panel auth-panel-showcase">
          <div className="showcase-orb orb-one" />
          <div className="showcase-orb orb-two" />
          <div className="showcase-orb orb-three" />
          <div className="showcase-content">
            <p className="showcase-kicker">CloudBalance</p>
            <h3>The clearest view of cloud cost, users, and accounts.</h3>
            <p>
              Organize access, monitor spend patterns, and reduce waste with a
              workspace built for calm decision-making.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;

