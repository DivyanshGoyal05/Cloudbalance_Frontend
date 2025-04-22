import { useState } from "react";
import "../OnBoarding/OnboardingPageOne.css"; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveIamRoleInfo } from "../../REDUX/actions/onboardingActions";

export default function OnboardingPageOne() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onboardingData = useSelector((state) => state.onboarding);

  // Initialize state with values from Redux if available
  const [roleARN, setRoleARN] = useState(onboardingData.roleARN || "");
  // const [roleName, setRoleName] = useState(
  //   onboardingData.roleName || "CK-Tuner-Role-dev2"
  // );
  const [accountname, setAccountName] = useState(
    onboardingData.accountname || ""
  );
  const [accountid, setAccountID] = useState(onboardingData.accountid || "");

  const trustPolicyJson = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::951485052809:root"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "3RPSUSP1TRUJvH3ZhvnT4oJ7JaVT50P09N800JTr3xHvbDfwAMD-T7fsM0w"
        }
      }
    }
  ]
}`;

  const handleNext = () => {
    // Save form data to Redux before navigating
    dispatch(
      saveIamRoleInfo({
        arnRole: roleARN,
        // roleName,
        accountName: accountname,
        accountId: accountid,
      })
    );

    // Navigate to the next page
    navigate("/dashboard/onboardingpagetwo");
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleCopyPolicy = () => {
    navigator.clipboard.writeText(trustPolicyJson);
  };

  return (
    <div className="onboarding-container">
      <h1 className="onboarding-title">Create an IAM Role</h1>
      <p className="onboarding-subtitle">
        Create an IAM Role by following these steps
      </p>

      <div className="onboarding-card">
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
              In the <span className="italic">Trusted entity type</span>{" "}
              section, select <span className="bold">Custom trust policy</span>.
              Replace the prefilled policy with the policy provided below -
            </p>
            <div className="code-container">
              <div className="json-text">{trustPolicyJson}</div>
              <button className="copy-button" onClick={handleCopyPolicy}>
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Steps 3-5 remain the same */}
        {/* ... */}

        {/* Step 6 */}
        <div className="step-container">
          <div className="step-number">
            <span>6</span>
          </div>
          <div className="step-content">
            <p className="step-instruction">
              Paste the copied Role ARN below -
            </p>
            <div className="form-group">
              <label className="input-label">
                Enter the IAM Role ARN <span className="required">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter the IAM Role ARN"
                value={roleARN}
                onChange={(e) => setRoleARN(e.target.value)}
                className="arn-input"
                required
              />
            </div>
            <label className="input-label">Enter Cloud Account ID</label>
            <input
              type="text"
              className="acc-id-input"
              value={accountid}
              onChange={(e) => setAccountID(e.target.value)}
              placeholder="Enter Cloud Account ID"
            />
            <label className="input-label">Enter Cloud Account Name</label>
            <input
              type="text"
              className="acc-name-input"
              value={accountname}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Enter the Cloud Account Name"
            />
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="button-container">
          <div className="action-buttons">
            <button className="next-button" onClick={handleNext}>
              Next - Add Customer Managed Policies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
