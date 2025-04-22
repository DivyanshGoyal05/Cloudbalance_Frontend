import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../UserManagement/addUser.css"; // Import your CSS file for styling

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
        const response = await axios.get(`${URL}/cloudAccount/getall`, {
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

  // Select all accounts
  const selectAllAccounts = () => {
    setUser({
      ...user,
      assignedAccounts: [
        ...new Set([...user.assignedAccounts, ...filteredAccounts]),
      ],
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
      await axios.post(`${URL}/users/create`, userToSubmit, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      navigate("/users"); // Go back to user list
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="Email"
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
            <option value="ADMIN">Admin</option>
            <option value="READONLY">ReadOnly</option>
            <option value="CUSTOMER">Customer</option>
          </select>
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
                <div className="checkbox-item select-all">
                  <input
                    type="checkbox"
                    id="select-all"
                    onChange={selectAllAccounts}
                  />
                  <label htmlFor="select-all">Select All</label>
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

              <div className="transfer-buttons">
                <button
                  type="button"
                  className="transfer-btn"
                  onClick={() => {
                    const selectedAccounts = filteredAccounts.filter(
                      (acc) =>
                        !user.assignedAccounts.some((a) => a.id === acc.id)
                    );
                    if (selectedAccounts.length > 0) {
                      setUser({
                        ...user,
                        assignedAccounts: [
                          ...user.assignedAccounts,
                          ...selectedAccounts,
                        ],
                      });
                    }
                  }}
                >
                  &gt;
                </button>
                <button
                  type="button"
                  className="transfer-btn"
                  onClick={() => {
                    setUser({
                      ...user,
                      assignedAccounts: [],
                    });
                  }}
                >
                  &lt;
                </button>
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
              alert("User Create successfully");
            }}
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
