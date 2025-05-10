import { useState, useEffect } from "react";
import "../OnBoarding/OnboardingPageOne.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveIamRoleInfo } from "../../redux/actions/onboardingActions";

export default function OnboardingPageOne() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { roleARN, accountName, accountId } = useSelector(
    (state) => state.onboarding
  );
  

  const [formData, setFormData] = useState({
    roleARN: roleARN || "",
    accountName: accountName || "",
    accountId: accountId || "",
  });

  useEffect(() => {
    setFormData({
      roleARN: roleARN || "",
      accountName: accountName || "",
      accountId: accountId || "",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    dispatch(saveIamRoleInfo(formData));
    navigate("/dashboard/onboardingpagetwo");
  };

  const trustPolicyJson = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}`;

  const handleCopyPolicy = () => {
    navigator.clipboard.writeText(trustPolicyJson).then(() => {
      alert("Policy copied to clipboard!");
    });
  };

  return (
    <div className="onboarding-container">
      {/* Step 1 */}
      <div className="step-container">
        <div className="step-number">
          <span>1</span>
        </div>
        <div className="step-content">
          <p>
            Log into AWS account &{" "}
            <span className="highlight">Create an IAM Role</span>.
          </p>
        </div>
      </div>

      {/* Step 2 */}
      <div className="step-container">
        <div className="step-number">
          <span>2</span>
        </div>
        <div className="step-content">
          <p className="step-instruction">
            In the <span className="italic">Trusted entity type</span> section,
            select <span className="bold">Custom trust policy</span>. Replace
            the prefilled policy with the policy provided below:
          </p>
          <div className="code-container">
            <div className="json-text">{trustPolicyJson}</div>
            <button className="copy-button" onClick={handleCopyPolicy}>
              Copy Policy
            </button>
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div className="step-container">
        <div className="step-number">
          <span>3</span>
        </div>
        <div className="step-content">
          <p className="step-instruction">Paste the copied Role ARN below:</p>
          <form onSubmit={handleNext}>
            <div className="form-group">
              <label className="input-label">
                Enter the IAM Role ARN <span className="required">*</span>
              </label>
              <input
                type="text"
                name="roleARN"
                placeholder="Enter the IAM Role ARN"
                value={formData.roleARN}
                onChange={handleChange}
                className="arn-input"
              />
            </div>

            <label className="input-label">Enter Cloud Account ID</label>
            <input
              type="text"
              name="accountId"
              className="acc-id-input"
              value={formData.accountId}
              onChange={handleChange}
              placeholder="Enter Cloud Account ID"
            />

            <label className="input-label">Enter Cloud Account Name</label>
            <input
              type="text"
              name="accountName"
              className="acc-name-input"
              value={formData.accountName}
              onChange={handleChange}
              placeholder="Enter the Cloud Account Name"
            />

            <div className="button-container">
              <button type="submit" className="next-button">
                Next - Add Customer Managed Policies
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
