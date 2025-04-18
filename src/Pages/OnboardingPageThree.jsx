import React, { useState } from "react";
import "../Styles/OnboardingPageThree.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"; // Added axios import

function OnboardingPageThree() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Getting the state from Redux
  const onboardingData = useSelector((state) => state.onboarding);

  const reportName = "ck-tuner-275595855473-hourly-cur";
  const reportPrefix = "275595855473";
  // Simple URL without using environment variables
  const URL = "https://api.example.com"; // Replace with your actual API URL

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert(`${text} copied to clipboard!`);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        alert("Failed to copy text.");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get auth token directly from localStorage
      const authToken = localStorage.getItem("authToken");

      // Prepare data from Redux store
      const dataToSubmit = {
        cloudAccountId: onboardingData.accountid,
        cloudAccountName: onboardingData.accountname,
        roleARN: onboardingData.roleARN,
        roleName: onboardingData.roleName,
        reportName: reportName,
        reportPrefix: reportPrefix,
      };

      // Make the API call directly with the URL
      const response = await axios.post(
        `${URL}/cloudAccount/create`,
        dataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // Dispatch action to mark onboarding as complete
      dispatch({ type: "COMPLETE_ONBOARDING", payload: response.data });

      alert("Onboarding completed successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "There was an error submitting your information. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app">
      <section className="cur-instructions">
        <div className="form-wrapper">
          <div className="form-heading">
            <h1>Create Cost & Usage Report</h1>
            <p className="form-sub-heading">
              Create a Cost & Usage Report by following these steps
            </p>
          </div>

          <div className="form-body">
            <ol>
              <li>
                <span className="steps-wrapper">
                  <span className="steps">1</span>
                </span>
                <div className="content">
                  Go to{" "}
                  <a
                    href="https://console.aws.amazon.com/billing/home#/reports"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blue-link"
                  >
                    Cost and Usage Reports
                  </a>{" "}
                  in the Billing Dashboard and click on{" "}
                  <span className="bold-text">Create report</span>.
                </div>
              </li>

              <li>
                <span className="steps-wrapper">
                  <span className="steps">2</span>
                </span>
                <div className="content">
                  Name the report as shown below and select the{" "}
                  <span className="bold-text">Include resource IDs</span>{" "}
                  checkbox:
                  <div
                    className="copyfield-wrapper"
                    onClick={() => copyToClipboard(reportName)}
                  >
                    <pre id="report-name">{reportName}</pre>
                    <button
                      className="copy-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(reportName);
                      }}
                    >
                      <svg
                        className="copy-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect
                          x="8"
                          y="2"
                          width="8"
                          height="4"
                          rx="1"
                          ry="1"
                        ></rect>
                      </svg>
                    </button>
                  </div>
                  <p className="no-message">
                    Click anywhere in box to copy the content inside.
                  </p>
                </div>
              </li>

              <li>
                <span className="steps-wrapper">
                  <span className="steps">3</span>
                </span>
                <div className="content">
                  In <span className="italic-text">Configure S3 Bucket</span>,
                  provide the name of the S3 bucket that was created.
                </div>
              </li>

              <li>
                <span className="steps-wrapper">
                  <span className="steps">4</span>
                </span>
                <div className="content">
                  In the Delivery options section, enter the below-mentioned
                  Report path prefix
                  <div
                    className="copyfield-wrapper"
                    onClick={() => copyToClipboard(reportPrefix)}
                  >
                    <pre id="report-prefix">{reportPrefix}</pre>
                    <button
                      className="copy-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(reportPrefix);
                      }}
                    >
                      <svg
                        className="copy-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect
                          x="8"
                          y="2"
                          width="8"
                          height="4"
                          rx="1"
                          ry="1"
                        ></rect>
                      </svg>
                    </button>
                  </div>
                </div>
              </li>

              <li>
                <span className="steps-wrapper">
                  <span className="steps">5</span>
                </span>
                <div className="content">
                  Click on <span className="bold-text">Next</span>. Now, review
                  the configuration of the Cost and Usage Report. Once
                  satisfied, click on{" "}
                  <span className="bold-text">Create Report</span>.
                </div>
              </li>
            </ol>

            <div className="form-footer">
              <button className="cancel-btn" onClick={() => navigate("/")}>
                Cancel
              </button>
              <div className="previous-next-section">
                <button
                  className="back-btn"
                  onClick={() => navigate("/onboarding-page-two")}
                >
                  Back
                </button>
                <button
                  className="next-btn"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OnboardingPageThree;
