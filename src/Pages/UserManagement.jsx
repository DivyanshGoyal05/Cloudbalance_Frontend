import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/UserManagement.css";

function UserManagement() {
  const dispatch = useDispatch();
  const { users = [], accounts } = useSelector((state) => state);
  const navigate = useNavigate();
  const URL = "http://localhost:8080";

  // Fetch users and accounts
  useEffect(() => {
    fetchUsers();
    fetchAccounts();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${URL}/users/fetchall`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      dispatch({ type: "SET_USERS", payload: response.data });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(`${URL}/cloudAccount/getall`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      dispatch({ type: "SET_ACCOUNTS", payload: response.data });
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  return (
    <div className="user-management-container">
      <h2>User Management</h2>
      <button onClick={() => navigate("/users/add")}>+ Add User</button>

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
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>
                {accounts
                  .filter((acc) => user.assignedAccounts.includes(acc.id))
                  .map((a) => a.name)
                  .join(", ") || "None"}
              </td>
              <td>
                <button onClick={() => navigate(`/users/edit/${user.id}`)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
