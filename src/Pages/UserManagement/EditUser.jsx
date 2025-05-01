import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../API/axiosConfig";
import "../UserManagement/EditUser.css";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const URL = "http://localhost:8080";

  const [user, setUser] = useState({
    username: "",
    name: "",
    password: "",
    role: "",
    assignedAccounts: [],
  });

  const [allAccounts, setAllAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`${URL}/cloudAccount/getallaccounts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setAllAccounts(response.data);
        setFilteredAccounts(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    fetchAccounts();
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredAccounts(allAccounts);
    } else {
      const filtered = allAccounts.filter(
        (account) =>
          account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          account.accountId.toString().includes(searchTerm)
      );
      setFilteredAccounts(filtered);
    }
  }, [searchTerm, allAccounts]);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
      await axios.put(`${URL}/users/update/${id}`, user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      // Refresh the users list in Redux
      const response = await axios.get(`${URL}/users/getallusers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      // dispatch({ type: "SET_USERS", payload: response.data });

      navigate("/dashboard/usermanagement"); // Go back to user list
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Edit User </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            // readOnly // Use readOnly instead of disabled if you want it to be included in form submission
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

        <div className="associated-account-id"></div>

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
            <div className="search-container">
              <input
                type="text"
                placeholder="Search accounts"
                value={searchTerm}
                onChange={handleSearchChange}
                className="form-input"
              />
            </div>
            <div className="accounts-checkbox-group">
              {filteredAccounts.length === 0 ? (
                <p>
                  No accounts available. Please check your backend or try again
                  later.
                </p>
              ) : (
                filteredAccounts.map((account) => (
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
                ))
              )}
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
