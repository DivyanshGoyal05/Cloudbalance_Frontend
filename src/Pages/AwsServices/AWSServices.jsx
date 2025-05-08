import React, { useState, useEffect } from "react";
import axios from "axios";
import "../AwsServices/AWSServices.css"; // Import your CSS file for styling

const AWSServices = ({ userRole }) => {
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [activeTab, setActiveTab] = useState("RDS");
  const [awsData, setAwsData] = useState({ ec2: [], rds: [], asg: [] });
  const [loading, setLoading] = useState(false);
  const [assignedAccounts, setAssignedAccounts] = useState([]);
  const [accountsLoading, setAccountsLoading] = useState(true);
  const [accountError, setAccountError] = useState(null);


  // Fetch accounts when component mounts
  useEffect(() => {
    const fetchAccounts = async () => {
      setAccountsLoading(true);
      setAccountError(null);

      try {
        const response = await axios.get(
          "http://localhost:8080/cloudAccount/getallaccounts",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setAssignedAccounts(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
        setAccountError(
          "Failed to load accounts. Please check your connection and try again."
        );
      } finally {
        setAccountsLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleAccountChange = (e) => {
    setSelectedAccountId(e.target.value);
  };


  const fetchAWSData = async (accountId) => {
    setLoading(true);
    try {
      console.log(`Fetching AWS data for account ID: ${accountId}`);
      const response = await axios.get(
        `http://localhost:8080/api/aws-services/${accountId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("API response:", response.data);
      setAwsData(response.data);
    } catch (error) {
      console.error("Error fetching AWS data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedAccountId) {
      fetchAWSData(selectedAccountId);
    }
  }, [selectedAccountId]);

  const renderEC2Table = () => (
    <table className="resource-table">
      <thead>
        <tr>
          <th>Resource ID</th>
          <th>Resource Name</th>
          <th>Region</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {awsData.ec2.map((instance) => (
          <tr key={instance.id}>
            <td>{instance.id}</td>
            <td>{instance.name || instance.id}</td>
            <td>{instance.zone || instance.region}</td>
            <td>{instance.state}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderRDSTable = () => (
    <table className="resource-table">
      <thead>
        <tr>
          <th>Resource ID</th>
          <th>Resource Name</th>
          <th>Engine</th>
          <th>Region</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {awsData.rds.map((rds) => (
          <tr key={rds.id}>
            <td>{rds.id}</td>
            <td>{rds.name || rds.id}</td>
            <td>{rds.engine}</td>
            <td>{rds.region}</td>
            <td>{rds.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderASGTable = () => (
    <table className="resource-table">
      <thead>
        <tr>
          <th>Resource ID</th>
          <th>Resource Name</th>
          <th>Region</th>
          <th>Desired Capacity</th>
          <th>Min Size</th>
          <th>Max Size</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {awsData.asg.map((asg) => (
          <tr key={asg.id || asg.resourceId}>
            <td>{asg.id || asg.resourceId}</td>
            <td>{asg.name}</td>
            <td>{asg.region}</td>
            <td>{asg.desiredCapacity}</td>
            <td>{asg.minSize}</td>
            <td>{asg.maxSize}</td>
            <td>{asg.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // Show all accounts without filtering
  const filteredAccounts = assignedAccounts;

  return (
    <div className="aws-container">
      <div className="account-selector">
        <label>Select AWS Account:</label>
        {accountsLoading ? (
          <p>Loading accounts...</p>
        ) : accountError ? (
          <div className="error-message">
            {accountError}
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        ) : (
          <select value={selectedAccountId} onChange={handleAccountChange}>
            <option value="">-- Choose Account --</option>
            {filteredAccounts.map((acc) => (
              <option key={acc.id} value={acc.accountId}>
                {acc.name} ({acc.accountId})
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedAccountId && (
        <div className="service-tabs">
          <button
            className={`tab ${activeTab === "EC2" ? "active" : ""}`}
            onClick={() => setActiveTab("EC2")}
          >
            EC2
          </button>
          <button
            className={`tab ${activeTab === "RDS" ? "active" : ""}`}
            onClick={() => setActiveTab("RDS")}
          >
            RDS
          </button>
          <button
            className={`tab ${activeTab === "ASG" ? "active" : ""}`}
            onClick={() => setActiveTab("ASG")}
          >
            ASG
          </button>
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <p>Loading AWS data...</p>
        </div>
      ) : selectedAccountId ? (
        <div className="resource-container">
          {activeTab === "EC2" && (
            <div className="resource-section">
              <h3>EC2 Instances</h3>
              {awsData.ec2.length > 0 ? (
                renderEC2Table()
              ) : (
                <p className="no-data">
                  No EC2 instances found for this account.
                </p>
              )}
            </div>
          )}

          {activeTab === "RDS" && (
            <div className="resource-section">
              <h3>RDS Instances</h3>
              {awsData.rds.length > 0 ? (
                renderRDSTable()
              ) : (
                <p className="no-data">
                  No RDS instances found for this account.
                </p>
              )}
            </div>
          )}

          {activeTab === "ASG" && (
            <div className="resource-section">
              <h3>Auto Scaling Groups</h3>
              {awsData.asg && awsData.asg.length > 0 ? (
                renderASGTable()
              ) : (
                <p className="no-data">
                  No Auto Scaling Groups found for this account.
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <p className="info-text">
          Please select an account to view AWS services data.
        </p>
      )}
    </div>
  );
};

export default AWSServices;
