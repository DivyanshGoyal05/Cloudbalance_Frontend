// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginPage from "./Pages/LoginPage";
// import UserManagement from "./Pages/UserManagement";
// import Onboarding from "./Pages/OnboardingPageOne";
// import CostExplorer from "../src/Pages/CostExplorer";
// import AWSServices from "./Pages/AWSServices";
// import DashboardLayout from "./Pages/DashboardLayout";
// import OnboardingPageTwo from "../src/Pages/OnboardingPageTwo";
// import OnboardingPageThree from "../src/Pages/OnboardingPageThree";
// import OnboardingPageOne from "./Pages/OnboardingPageOne";
// import "./App.css";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public route for login */}
//         <Route path="/" element={<LoginPage />} />

//         {/* Protected routes inside DashboardLayout */}
//         <Route path="/dashboard" element={<DashboardLayout />}>
//           <Route path="usermanagement" element={<UserManagement />} />
//           <Route path="onboarding" element={<Onboarding />} />
//           <Route path="/" element={<OnboardingPageOne />} />
//           <Route path="/onboarding-page-two" element={<OnboardingPageTwo />} />
//           <Route
//             path="/onboarding-page-three"
//             element={<OnboardingPageThree />}
//           />
//           <Route path="cost-explorer" element={<CostExplorer />} />
//           <Route path="aws-services" element={<AWSServices />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import LoginPage from "./Pages/LoginPage";
import UserManagement from "./Pages/UserManagement";
import Onboarding from "./Pages/OnboardingPageOne";
import CostExplorer from "../src/Pages/CostExplorer";
import AWSServices from "./Pages/AWSServices";
import DashboardLayout from "./Pages/DashboardLayout";
import OnboardingPageTwo from "../src/Pages/OnboardingPageTwo";
import OnboardingPageThree from "../src/Pages/OnboardingPageThree";
import OnboardingPageOne from "./Pages/OnboardingPageOne";
import SignupPage from "./Pages/SignupPage";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            {/* Public route for login */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected routes inside DashboardLayout */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="usermanagement" element={<UserManagement />} />
              <Route path="onboarding" element={<Onboarding />} />
              <Route index element={<OnboardingPageOne />} />
              <Route
                path="onboarding-page-two"
                element={<OnboardingPageTwo />}
              />
              <Route
                path="onboarding-page-three"
                element={<OnboardingPageThree />}
              />
              <Route path="cost-explorer" element={<CostExplorer />} />
              <Route path="aws-services" element={<AWSServices />} />
            </Route>

            {/* Additional onboarding routes if needed */}
            <Route
              path="/onboarding-page-one"
              element={<OnboardingPageOne />}
            />
            <Route
              path="/onboarding-page-two"
              element={<OnboardingPageTwo />}
            />
            <Route
              path="/onboarding-page-three"
              element={<OnboardingPageThree />}
            />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
