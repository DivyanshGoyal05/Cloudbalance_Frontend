import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import LoginPage from "./Pages/LoginPage";
import UserManagement from "./Pages/UserManagement";
import AddUser from "./Pages/AddUser";
import EditUser from "./Pages/EditUser";
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

            {/* User management routes */}
            <Route path="/users/add" element={<AddUser />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
