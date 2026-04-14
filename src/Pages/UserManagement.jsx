import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { demoAccounts, demoUsers } from "../demo/demoData";
import "../Styles/UserManagement.css";

function UserManagement() {
  const dispatch = useDispatch();
  const { users = [], accounts = [] } = useSelector((state) => state.user);
  const { isGuest } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      if (isGuest) {
        dispatch({ type: "SET_USERS", payload: demoUsers });
        dispatch({ type: "SET_ACCOUNTS", payload: demoAccounts });
        return;
      }

      try {
        const [usersResponse, accountsResponse] = await Promise.all([
          api.get("/users/all"),
          api.get("/cloudAccount/getall"),
        ]);

        dispatch({ type: "SET_USERS", payload: usersResponse.data });
        dispatch({ type: "SET_ACCOUNTS", payload: accountsResponse.data });
      } catch (error) {
        console.error("Error loading user management data:", error);
      }
    };

    loadData();
  }, [dispatch, isGuest]);

  return (
    <div className="user-management-container">
      <div className="user-management-header">
        <div>
          <p className="section-kicker">Administration</p>
          <h2>User Management</h2>
          <p className="section-description">
            Review access, roles, and account assignments from one place.
          </p>
          {isGuest && (
            <p className="demo-note">
              Guest preview uses demo users and sample account assignments.
            </p>
          )}
        </div>
        <button onClick={() => navigate("/users/add")}>+ Add User</button>
      </div>

      <div className="table-shell">
        <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Role</th>
            <th>Assigned Accounts</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td data-label="Username">{user.username}</td>
              <td data-label="Name">{user.name}</td>
              <td data-label="Role">
                <span className="role-pill">{user.role}</span>
              </td>
              <td data-label="Assigned Accounts">
                {accounts
                  .filter(
                    (acc) =>
                      user.assignedAccounts.includes(acc.accountId) ||
                      user.assignedAccounts.includes(acc.id)
                  )
                  .map((a) => a.name)
                  .join(", ") || "None"}
              </td>
              <td data-label="Action">
                <button onClick={() => navigate(`/users/edit/${user.id}`)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;
