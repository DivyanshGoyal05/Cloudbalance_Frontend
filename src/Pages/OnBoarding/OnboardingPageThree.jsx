import React, { useState, useEffect } from "react";
import "../OnBoarding/OnboardingPageThree.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import {
  completeOnboarding,
  clearOnboardingData,
} from "../../redux/actions/onboardingActions";

function OnboardingPageThree() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onboardingData = useSelector((state) => state.onboarding);

  const reportName = "cur-report";
  const reportPrefix = "cur-report";

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.info("Copied to clipboard!"))
      .catch((err) => {
        console.error("Copy failed:", err);
        toast.error("Failed to copy text.");
      });
  };

  // Check if onboarding data is available
  useEffect(() => {
    if (!onboardingData.roleARN || !onboardingData.accountId) {
      setSubmitError("Missing required onboarding data. Please start over.");
    }
  }, [onboardingData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new Error("Authentication token missing");
      }

      const payload = {
        accountId: onboardingData.accountId,
        accountName: onboardingData.accountName || "",
        roleArn: onboardingData.roleARN,
      };

      const response = await axios.post(
        "http://localhost:8080/cloudAccount/create",
        payload,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(completeOnboarding(response.data));
      dispatch(clearOnboardingData());
      toast.success("🎉 Onboarding successful! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard/onboardingpageone");
      }, 1500);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error?.response?.data || error.message);
      setSubmitError(
        error.response?.data?.message ||
          error.message ||
          "Failed to complete onboarding. Please try again."
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
                  in the Billing Dashboard and click{" "}
                  <span className="bold-text">Create report</span>
                </div>
              </li>

              <li>
                <span className="steps-wrapper">
                  <span className="steps">2</span>
                </span>
                <div className="content">
                  Name the report as shown below and select{" "}
                  <span className="bold-text">Include resource IDs</span>{" "}
                  checkbox:
                  <div
                    className="copyfield-wrapper"
                    onClick={() => copyToClipboard(reportName)}
                  >
                    <pre>{reportName}</pre>
                    <button
                      className="copy-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(reportName);
                      }}
                    >
                      📋
                    </button>
                  </div>
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
                  In Delivery options, enter the following Report path prefix:
                  <div
                    className="copyfield-wrapper"
                    onClick={() => copyToClipboard(reportPrefix)}
                  >
                    <pre>{reportPrefix}</pre>
                    <button
                      className="copy-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(reportPrefix);
                      }}
                    >
                      📋
                    </button>
                  </div>
                </div>
              </li>

              <li>
                <span className="steps-wrapper">
                  <span className="steps">5</span>
                </span>
                <div className="content">
                  Click <span className="bold-text">Next</span>, review, and
                  then click <span className="bold-text">Create Report</span>.
                </div>
              </li>
            </ol>
          </div>

          <div className="form-footer">
            {submitError && <div className="error-message">{submitError}</div>}

            <button
              className="cancel-btn"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>

            <div className="previous-next-section">
              <button
                className="back-btn"
                onClick={() => navigate("/dashboard/onboardingpagetwo")}
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
      </section>
    </div>
  );
}

export default OnboardingPageThree;
