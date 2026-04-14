import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosConfig";
import { demoAccounts, demoUsers } from "../demo/demoData";
import "../Styles/UserManagement.css";

function EditUser() {
  const { id } = useParams();
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

  // Fetch user data when component loads
  useEffect(() => {
    const fetchData = async () => {
      if (isGuest) {
        const availableAccounts =
          accounts.length > 0 ? accounts : demoAccounts;

        if (accounts.length === 0) {
          dispatch({ type: "SET_ACCOUNTS", payload: demoAccounts });
        }

        const guestUser =
          (users.length > 0 ? users : demoUsers).find(
            (demoUser) => String(demoUser.id) === String(id)
          ) || demoUsers[0];
        const assignedAccountIds = (guestUser.assignedAccounts || [])
          .map((assignedAccountId) => {
            const matchingAccount = availableAccounts.find(
              (account) => account.accountId === assignedAccountId
            );
            return matchingAccount?.id;
          })
          .filter(Boolean);

        setUser({
          ...guestUser,
          assignedAccounts: assignedAccountIds,
          password: "",
        });
        return;
      }

      try {
        const requests = [api.get(`/users/${id}`)];
        if (accounts.length === 0) {
          requests.push(api.get("/cloudAccount/getall"));
        }

        const [userResponse, accountsResponse] = await Promise.all(requests);
        const availableAccounts = accountsResponse?.data ?? accounts;

        if (accountsResponse) {
          dispatch({ type: "SET_ACCOUNTS", payload: accountsResponse.data });
        }

        const assignedAccountIds = (userResponse.data.assignedAccounts || [])
          .map((assignedAccountId) => {
            const matchingAccount = availableAccounts.find(
              (account) => account.accountId === assignedAccountId
            );
            return matchingAccount?.id;
          })
          .filter(Boolean);

        setUser({
          ...userResponse.data,
          assignedAccounts: assignedAccountIds,
          password: "",
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchData();
  }, [accounts, accounts.length, dispatch, id, isGuest, users]);

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
        payload: (users.length > 0 ? users : demoUsers).map((demoUser) =>
          String(demoUser.id) === String(id)
            ? {
                ...demoUser,
                name: user.name,
                role: user.role,
                assignedAccounts: (accounts || [])
                  .filter((account) => user.assignedAccounts.includes(account.id))
                  .map((account) => account.accountId),
              }
            : demoUser
        ),
      });
      alert("Guest preview updated the demo user for this session.");
      navigate("/dashboard/usermanagement");
      return;
    }

    try {
      await api.put(`/users/${id}`, user);

      const response = await api.get("/users/all");
      dispatch({ type: "SET_USERS", payload: response.data });

      navigate("/dashboard/usermanagement");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Edit User</h2>
      {isGuest && (
        <p className="demo-note">
          Guest preview mode updates demo data locally only.
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
            Save Changes
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

export default EditUser;
