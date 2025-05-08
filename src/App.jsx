import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import LoginPage from "./Pages/LoginPage/LoginPage";
import UserManagement from "./Pages/UserManagement/UserManagement";
import Onboarding from "./Pages/OnBoarding/OnboardingPageOne";
import CostExplorer from "./Pages/CostExplorer/CostExplorer";
import AWSServices from "./Pages/AwsServices/AWSServices";
import DashboardLayout from "./Pages/DashBoard/DashboardLayout";
import OnboardingPageTwo from "./Pages/OnBoarding/OnboardingPageTwo";
import OnboardingPageThree from "./Pages/OnBoarding/OnboardingPageThree";
import OnboardingPageOne from "./Pages/OnBoarding/OnboardingPageOne";
import AddUser from "./Pages/UserManagement/AddUser";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import EditUser from "./Pages/UserManagement/EditUser";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="aws-services" element={<AWSServices />} />
              <Route path="cost-explorer" element={<CostExplorer />} />
              <Route path="usermanagement" element={<UserManagement />} />
              <Route path="usermanagement/adduser" element={<AddUser />} />
              <Route path="edituser/:id" element={<EditUser />} />
              <Route path="onboarding" element={<Onboarding />} />
              <Route path="onboardingpageone" element={<OnboardingPageOne />} />
              <Route path="onboardingpagetwo" element={<OnboardingPageTwo />} />
              <Route
                path="onboardingpagethree"
                element={<OnboardingPageThree />}
              />
            </Route>
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            // hideProgressBar={false}
            // newestOnTop={false}
            // closeOnClick
            // rtl={false}
            // pauseOnFocusLoss
            // draggable
            // pauseOnHover
          />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
