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
import AddUser from "../src/Pages/AddUser";
import "./App.css";
import EditUser from "./Pages/EditUser";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            {/* Public route for login */}
            <Route path="/" element={<LoginPage />} />

            {/* Protected routes inside DashboardLayout */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="aws-services" element={<AWSServices />} />
              <Route path="cost-explorer" element={<CostExplorer />} />
              <Route path="usermanagement" element={<UserManagement />} />
              <Route path="usermanagement/adduser" element={<AddUser />} />
              <Route path="usermanagement/edit-user" element={<EditUser />} />
              <Route path="onboarding" element={<Onboarding />} />
              <Route path="onboardingpageone" element={<OnboardingPageOne />} />
              <Route path="onboardingpagetwo" element={<OnboardingPageTwo />} />
              <Route
                path="onboardingpagethree"
                element={<OnboardingPageThree />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
