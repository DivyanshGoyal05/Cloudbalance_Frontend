import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./UserManagement.css";

function EditUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state);
  const navigate = useNavigate();
  const URL = "http://localhost:8080";

  const [user, setUser] = useState({
    username: "",
    name: "",
    password: "",
    role: "Customer",
    assignedAccounts: [],
  });

  // Fetch user data when component loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${URL}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setUser({ ...response.data, password: "" }); // Don't show existing password
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

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
    try {
      await axios.put(`${URL}/users/${id}`, user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      // Refresh the users list in Redux
      const response = await axios.get(`${URL}/users/fetchall`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      dispatch({ type: "SET_USERS", payload: response.data });

      navigate("/users"); // Go back to user list
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            disabled
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
          <label>New Password (leave blank to keep current):</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter new password if changing"
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
            <option value="Admin">Admin</option>
            <option value="ReadOnly">ReadOnly</option>
            <option value="Customer">Customer</option>
          </select>
        </div>

        {user.role === "Customer" && (
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
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
