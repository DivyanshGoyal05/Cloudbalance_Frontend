import React, { useState, useEffect } from "react";
import axios from "../api/axiosConfig";
import { useSelector } from "react-redux";
import "../Styles/AWSServices.css";

const AWSServices = () => {
  const { role: userRole } = useSelector((state) => state.auth);
  const { accounts: assignedAccounts } = useSelector((state) => state.accounts); // Assuming accountsReducer stores this

  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [awsData, setAwsData] = useState({ ec2: [], s3: [], rds: [] });
  const [loading, setLoading] = useState(false);

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

      {loading ? (
        <p>Loading AWS data...</p>
      ) : selectedAccountId ? (
        <>
          <div className="section">
            <h3>EC2 Instances</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>State</th>
                  <th>Zone</th>
                  <th>Public IP</th>
                </tr>
              </thead>
              <tbody>
                {awsData.ec2.map((inst) => (
                  <tr key={inst.id}>
                    <td>{inst.id}</td>
                    <td>{inst.type}</td>
                    <td>{inst.state}</td>
                    <td>{inst.zone}</td>
                    <td>{inst.publicIp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="section">
            <h3>S3 Buckets</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Region</th>
                  <th>Objects</th>
                  <th>Size</th>
                </tr>
              </thead>
              <tbody>
                {awsData.s3.map((bucket) => (
                  <tr key={bucket.name}>
                    <td>{bucket.name}</td>
                    <td>{bucket.region}</td>
                    <td>{bucket.objects}</td>
                    <td>{bucket.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="section">
            <h3>RDS Instances</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Engine</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {awsData.rds.map((rds) => (
                  <tr key={rds.id}>
                    <td>{rds.id}</td>
                    <td>{rds.type}</td>
                    <td>{rds.engine}</td>
                    <td>{rds.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="info-text">
          Please select an account to view AWS services data.
        </p>
      )}
    </div>
  );
};

export default AWSServices;
