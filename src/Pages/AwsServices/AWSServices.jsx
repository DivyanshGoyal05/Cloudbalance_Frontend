import React, { useState, useEffect } from "react";
import axios from "../../API/axiosConfig";
import "../AwsServices/AWSServices.css"; // Import your CSS file for styling

const AWSServices = ({ userRole, assignedAccounts }) => {
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [activeTab, setActiveTab] = useState("EC2");
  const [awsData, setAwsData] = useState({ ec2: [], rds: [], asg: [] });
  const [loading, setLoading] = useState(false);

  //on the basis of role it should load accounts and if the role is customer
  //it should load accounts linked with the customer only not all accounts should be displayed

  const handleAccountChange = (e) => {
    setSelectedAccountId(e.target.value);
  };

  const fetchAWSData = async (accountId) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/aws-services/${accountId}`);
      setAwsData(response.data);
    } catch (error) {
      console.error("Error fetching AWS data", error);
    }
    setLoading(false);
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

  return (
    <div className="aws-container">
      <h2 className="heading">AWS Services Dashboard</h2>
      <p className="subheading">Monitor AWS resources by account</p>

      <div className="account-selector">
        <label>Select AWS Account:</label>
        <select value={selectedAccountId} onChange={handleAccountChange}>
          <option value="">-- Choose Account --</option>
          {(userRole === "ADMIN" || userRole === "READONLY"
            ? assignedAccounts
            : assignedAccounts.filter((acc) => acc.assignedToUser)
          ).map((acc) => (
            <option key={acc.accountId} value={acc.accountId}>
              {acc.name} ({acc.accountId})
            </option>
          ))}
        </select>
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
