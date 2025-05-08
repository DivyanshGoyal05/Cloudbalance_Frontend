import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../UserManagement/addUser.css"; // Import your CSS file for styling
import { toast } from "react-toastify";

function AddUser() {
  const navigate = useNavigate();
  const URL = "http://localhost:8080";

  const [user, setUser] = useState({
    username: "",
    name: "",
    password: "",
    role: "CUSTOMER",
    assignedAccounts: [],
  });

  const [allAccounts, setAllAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch available accounts when component loads
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

  // Add account to user's assigned accounts
  const addAccount = (account) => {
    if (!user.assignedAccounts.some((acc) => acc.id === account.id)) {
      setUser({
        ...user,
        assignedAccounts: [...user.assignedAccounts, account],
      });
    }
  };

  // Remove account from user's assigned accounts
  const removeAccount = (account) => {
    setUser({
      ...user,
      assignedAccounts: user.assignedAccounts.filter(
        (acc) => acc.id !== account.id
      ),
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract just the IDs for submission
    const userToSubmit = {
      ...user,
      assignedAccounts: user.assignedAccounts.map((account) => account.id),
    };

    try {
      const response = await axios.post(`${URL}/users/create`, userToSubmit, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      navigate("/dashboard/usermanagement");
      toast.success("User added successfully!", response?.data);
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to add user. Please try again.");
    }
  };

  return (
    <div className="outer-container">
      <div className="form-container">
        <h2>Add User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Username:</label>
              <input
                type="email"
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
          </div>

          <div className="form-row">
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
                <option value="ADMIN">Admin</option>
                <option value="READONLY">ReadOnly</option>
                <option value="CUSTOMER">Customer</option>
              </select>
            </div>
          </div>

          {user.role === "CUSTOMER" && (
            <div className="form-group account-selection">
              <div className="account-selection-container">
                <div className="account-column">
                  <h3>
                    Choose Account IDs to Associate{" "}
                    <span className="count">
                      {filteredAccounts.length} Available
                    </span>
                  </h3>
                  <div className="search-container">
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="search-input"
                    />
                  </div>
                  <div className="accounts-list">
                    {filteredAccounts.map((account) => (
                      <div key={account.id} className="checkbox-item">
                        <input
                          type="checkbox"
                          id={`account-${account.id}`}
                          checked={user.assignedAccounts.some(
                            (acc) => acc.id === account.id
                          )}
                          onChange={() => addAccount(account)}
                        />
                        <label htmlFor={`account-${account.id}`}>
                          {account.name} ({account.accountId})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="account-column">
                  <h3>
                    Associated Account IDs{" "}
                    <span className="count">
                      {user.assignedAccounts.length} Added
                    </span>
                  </h3>
                  {user.assignedAccounts.length === 0 ? (
                    <div className="no-accounts">
                      <div className="folder-icon">📁</div>
                      <p>No Account IDs Added</p>
                      <p className="helper-text">
                        Selected Account IDs will be shown here.
                      </p>
                    </div>
                  ) : (
                    <div className="accounts-list">
                      {user.assignedAccounts.map((account) => (
                        <div key={account.id} className="account-item">
                          <span>
                            {account.name} ({account.accountId})
                          </span>
                          <button
                            type="button"
                            className="remove-btn"
                            onClick={() => removeAccount(account)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Add User
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/dashboard/usermanagement");
              }}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
