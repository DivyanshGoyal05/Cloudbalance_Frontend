import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { demoAccounts, demoUsers } from "../demo/demoData";
import "../Styles/AddUser.css";

function AddUser() {
  const dispatch = useDispatch();
  const { users = [], accounts = [] } = useSelector((state) => state.user);
  const { isGuest } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    name: "",
    password: "",
    role: "CUSTOMER",
    assignedAccounts: [],
  });

  useEffect(() => {
    if (accounts.length > 0) {
      return;
    }

    if (isGuest) {
      dispatch({ type: "SET_ACCOUNTS", payload: demoAccounts });
      return;
    }

    const loadAccounts = async () => {
      try {
        const response = await api.get("/cloudAccount/getall");
        dispatch({ type: "SET_ACCOUNTS", payload: response.data });
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    loadAccounts();
  }, [accounts.length, dispatch, isGuest]);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const toggleAccount = (accountId) => {
    if (user.assignedAccounts.includes(accountId)) {
      setUser({
        ...user,
        assignedAccounts: user.assignedAccounts.filter(
          (id) => id !== accountId
        ),
      });
    } else {
      setUser({
        ...user,
        assignedAccounts: [...user.assignedAccounts, accountId],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isGuest) {
      dispatch({
        type: "SET_USERS",
        payload: [
          ...(users.length > 0 ? users : demoUsers),
          {
            id: Date.now(),
            username: user.username || "new.demo.user",
            name: user.name || "New Demo User",
            role: user.role,
            assignedAccounts: (accounts || [])
              .filter((account) => user.assignedAccounts.includes(account.id))
              .map((account) => account.accountId),
          },
        ],
      });
      alert("Guest preview saved a demo user locally for this session.");
      navigate("/dashboard/usermanagement");
      return;
    }

    try {
      await api.post("/users/create", user);

      const response = await api.get("/users/all");
      dispatch({ type: "SET_USERS", payload: response.data });

      navigate("/dashboard/usermanagement");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New User</h2>
      {isGuest && (
        <p className="demo-note">
          Guest preview mode will not create a real backend user.
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Role:</label>
          <select
            name="role"
            value={user.role}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="ADMIN">ADMIN</option>
            <option value="READONLY">READONLY</option>
            <option value="CUSTOMER">CUSTOMER</option>
          </select>
        </div>

        {user.role === "CUSTOMER" && (
          <div className="form-group">
            <label>Assign Accounts:</label>
            <div className="accounts-checkbox-group">
              {accounts.map((account) => (
                <div key={account.id} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={`account-${account.id}`}
                    checked={user.assignedAccounts.includes(account.id)}
                    onChange={() => toggleAccount(account.id)}
                  />
                  <label htmlFor={`account-${account.id}`}>
                    {account.name} ({account.accountId})
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Create User
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard/usermanagement")}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
