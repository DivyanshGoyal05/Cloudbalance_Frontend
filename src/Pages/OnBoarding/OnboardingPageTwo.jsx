import React from "react";
import "../OnBoarding/OnboardingPageTwo.css";
import { useNavigate } from "react-router-dom";

function OnboardingPageTwo() {
  const navigate = useNavigate();

  // Simple function to copy text when buttons are clicked
  function copyText(text) {
    // This copies the text to clipboard
    navigator.clipboard.writeText(text);

    // Show an alert to let the user know it worked
    alert("Copied to clipboard!");
  }

  return (
    <div className="container">
      <header>
        <h1>Add Customer Managed Policies</h1>
        <p className="description">
          Create an inline policy for the role by following these steps
        </p>
      </header>

      <div className="steps-container">
        {/* Step 1 */}
        <div className="step">
          <div className="step-number">1</div>
          <div className="step-content">
            <p className="step-instruction">
              Go to the{" "}
              <a href="#" className="highlight">
                Create Policy
              </a>{" "}
              Page.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="step">
          <div className="step-number">2</div>
          <div className="step-content">
            <p className="step-instruction">
              Click on the <strong>JSON</strong> tab and paste the following
              policy and click on Next:
            </p>
            <div
              className="code-block"
              onClick={() =>
                copyText(
                  "mediatore:DescribeObject,\nmediatore:Get*,\nmediatore:List*,\nmediator:Describe*,\nmediator:Get*,\nmediator:List*,\nec2:Describe*,\nelasticache:Describe*,\nevents:DescribeEventBus*,\nevents:List*,\nelasticloadbalancing:Describe*"
                )
              }
            >
              <button
                className="copy-button"
                onClick={(e) => {
                  e.stopPropagation();
                  copyText(
                    "mediatore:DescribeObject,\nmediatore:Get*,\nmediatore:List*,\nmediator:Describe*,\nmediator:Get*,\nmediator:List*,\nec2:Describe*,\nelasticache:Describe*,\nevents:DescribeEventBus*,\nevents:List*,\nelasticloadbalancing:Describe*"
                  );
                }}
              >
                📋
              </button>

              <p className="note">
                Click anywhere to box to copy the content inside.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="step">
          <div className="step-number">3</div>
          <div className="step-content">
            <p className="step-instruction">
              Go to the{" "}
              <a href="#" className="highlight">
                Create Policy
              </a>{" "}
              page. In the Name field, enter the policy name mentioned below and
              click on <strong>Create Policy</strong>.
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="step">
          <div className="step-number">4</div>
          <div className="step-content">
            <p className="step-instruction">
              Again, go to the{" "}
              <a href="#" className="highlight">
                Create Policy
              </a>{" "}
              page.
            </p>
          </div>
        </div>

        {/* Step 5 */}
        <div className="step">
          <div className="step-number">5</div>
          <div className="step-content">
            <p className="step-instruction">
              Click on the <strong>JSON</strong> tab, paste the following
              policy, and click <strong>Next</strong>:
            </p>
            <div
              className="code-block"
              onClick={() =>
                copyText(
                  "mediatore:DescribeObject,\nmediatore:Get*,\nmediatore:List*,\nmediator:Describe*,\nmediator:Get*,\nmediator:List*,\nec2:Describe*,\nelasticache:Describe*,\nevents:DescribeEventBus*,\nevents:List*,\nelasticloadbalancing:Describe*"
                )
              }
            >
              <button
                className="copy-button"
                onClick={(e) => {
                  e.stopPropagation();
                  copyText(
                    "mediatore:DescribeObject,\nmediatore:Get*,\nmediatore:List*,\nmediator:Describe*,\nmediator:Get*,\nmediator:List*,\nec2:Describe*,\nelasticache:Describe*,\nevents:DescribeEventBus*,\nevents:List*,\nelasticloadbalancing:Describe*"
                  );
                }}
              >
                📋
              </button>

              <p className="note">
                Click anywhere in this box to copy the content inside.
              </p>
            </div>
          </div>
        </div>

        {/* Step 6 */}
        <div className="step">
          <div className="step-number">6</div>
          <div className="step-content">
            <p className="step-instruction">
              In the Name field, enter the below-mentioned policy name and click
              on <strong>Create Policy</strong>.
            </p>
          </div>
        </div>

        {/* Step 7 */}
        <div className="step">
          <div className="step-number">7</div>
          <div className="step-content">
            <p className="step-instruction">
              Again Go to the{" "}
              <a href="#" className="highlight">
                Create Policy
              </a>{" "}
              Page.
            </p>
          </div>
        </div>

        {/* Step 8 */}
        <div className="step">
          <div className="step-number">8</div>
          <div className="step-content">
            <p className="step-instruction">
              Click on the <strong>JSON</strong> tab and paste the following
              policy and click on Next:
            </p>
            <div
              className="code-block"
              onClick={() =>
                copyText(
                  "mediatore:DescribeObject,\nmediatore:Get*,\nmediatore:List*,\nmediator:Describe*,\nmediator:Get*,\nmediator:List*,\nec2:Describe*,\nelasticache:Describe*,\nevents:DescribeEventBus*,\nevents:List*,\nelasticloadbalancing:Describe*"
                )
              }
            >
              <button
                className="copy-button"
                onClick={(e) => {
                  e.stopPropagation();
                  copyText(
                    "mediatore:DescribeObject,\nmediatore:Get*,\nmediatore:List*,\nmediator:Describe*,\nmediator:Get*,\nmediator:List*,\nec2:Describe*,\nelasticache:Describe*,\nevents:DescribeEventBus*,\nevents:List*,\nelasticloadbalancing:Describe*"
                  );
                }}
              >
                📋
              </button>

              <p className="note">
                Click anywhere to box to copy the content inside.
              </p>
            </div>
          </div>
        </div>

        {/* Step 9 */}
        <div className="step">
          <div className="step-number">9</div>
          <div className="step-content">
            <p className="step-instruction">
              In the Name field, enter below-mentioned policy name and click on
              <a href="#" className="highlight">
                Create Policy
              </a>{" "}
              Page.
            </p>
          </div>
        </div>

        {/* Step 10 */}
        <div className="step">
          <div className="step-number">10</div>
          <div className="step-content">
            <p className="step-instruction">
              Go to the{" "}
              <a href="#" className="highlight">
                Ck-tuner-Role
              </a>{" "}
              Page.
              {/* <img src="" alt="" /> */}
            </p>
          </div>
        </div>

        {/* Step 11 */}
        <div className="step">
          <div className="step-number">11</div>
          <div className="step-content">
            <p className="step-instruction">
              In Permission Policies{" "}
              <a href="#" className="highlight">
                click on Add permissions Attach Policy
              </a>{" "}
              Page.
              {/* <img src="" alt="" /> */}
            </p>
          </div>
        </div>

        {/* Step 12 */}
        <div className="step">
          <div className="step-number">12</div>
          <div className="step-content">
            <p className="step-instruction">
              Filter by Type Customer managed then search for{" "}
              <a href="#" className="highlight">
                cktuner-CostAuditPolicy,cktuner-SecAuditPolicy,cktuner-TunerReadEssentials
                and
              </a>{" "}
              select them.
              {/* <img src="" alt="" /> */}
            </p>
          </div>
        </div>

        {/* Step 13 */}
        <div className="step">
          <div className="step-number">13</div>
          <div className="step-content">
            <p className="step-instruction">
              Now, click on{" "}
              <a href="#" className="highlight">
                Add permissions
              </a>
              .
            </p>
            {/* <img src="" alt="Add permissions step" /> */}
          </div>
        </div>

        {/* Step 14 */}
        <div className="step">
          <div className="step-number">14</div>
          <div className="step-content">
            <p className="step-instruction">
              In <strong>Permission policies</strong>, click on{" "}
              <span className="highlight">
                Add permissions &gt; Create inline policy
              </span>
              .
            </p>
            {/* <img src="" alt="" /> */}
          </div>
        </div>

        {/* Step 15 */}
        <div className="step">
          <div className="step-number">15</div>
          <div className="step-content">
            <p className="step-instruction">
              Click on the <strong>JSON</strong> tab and paste the following
              policy.
            </p>
            <div
              className="code-block"
              onClick={() =>
                copyText(
                  "mediatore:DescribeObject,\nmediatore:Get*,\nmediatore:List*,\nmediator:Describe*,\nmediator:Get*,\nmediator:List*,\nec2:Describe*,\nelasticache:Describe*,\nevents:DescribeEventBus*,\nevents:List*,\nelasticloadbalancing:Describe*"
                )
              }
            >
              <button
                className="copy-button"
                onClick={(e) => {
                  e.stopPropagation();
                  copyText(
                    "mediatore:DescribeObject,\nmediatore:Get*,\nmediatore:List*,\nmediator:Describe*,\nmediator:Get*,\nmediator:List*,\nec2:Describe*,\nelasticache:Describe*,\nevents:DescribeEventBus*,\nevents:List*,\nelasticloadbalancing:Describe*"
                  );
                }}
              >
                📋
              </button>

              <p className="note">
                Click anywhere to box to copy the content inside.
              </p>
            </div>
          </div>
        </div>

        {/* Step 16 */}
        <div className="step">
          <div className="step-number">16</div>
          <div className="step-content">
            <p className="step-instruction">
              Click on{" "}
              <a href="#" className="highlight">
                Review Policy
              </a>{" "}
              Page.
              {/* <img src="" alt="" /> */}
            </p>
          </div>
        </div>

        {/* Step 17 */}
        <div className="step">
          <div className="step-number">17</div>
          <div className="step-content">
            <p className="step-instruction">
              Now,click on Review policy{" "}
              <a href="#" className="highlight">
                Create Policy
              </a>{" "}
              Page.
            </p>
          </div>
        </div>

        {/* Step 18 */}
        <div className="step">
          <div className="step-number">18</div>
          <div className="step-content">
            <p className="step-instruction">
              In the name field,enter the below-mentioned policy{" "}
              <a href="#" className="highlight">
                name and click on Create Policy.
              </a>{" "}
              Page.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation buttons at the bottom */}
      <div
        className="button-container"
        style={{ justifyContent: "space-between" }}
      >
        <button className="button">Cancel</button>
        <div>
          <button
            className="button"
            onClick={() => navigate("/dashboard/onboardingpageone")}
          >
            Back - Create An IAM Role
          </button>
          <button
            className="button primary"
            onClick={() => navigate("/dashboard/onboardingpagethree")}
          >
            Next - Create S3
          </button>
        </div>
      </div>
    </div>
  );
}

export default OnboardingPageTwo;
