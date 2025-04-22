import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../API/axiosConfig";
import "./UserManagement.css";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();
  const URL = "http://localhost:8080";

  useEffect(() => {
    fetchUsers();
    fetchAccounts();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${URL}/users/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setUsers(response.data);
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
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  return (
    <div className="user-management-container">
      <button onClick={() => navigate("/dashboard/usermanagement/adduser")}>
        + Add User
      </button>

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
                  .filter((acc) => user.assignedAccounts?.includes(acc.id))
                  .map((a) => a.name)
                  .join(", ") || "None"}
              </td>
              <td>
                <button onClick={() => navigate("/dashboard/edituser")}>
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
