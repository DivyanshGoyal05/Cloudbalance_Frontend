import { combineReducers } from "redux";
import authReducer from "./authReducer";
import onboardingReducer from "./onboardingReducer";  // Import the onboardingReducer

const rootReducer = combineReducers({
    auth: authReducer,
    onboarding: onboardingReducer,  // Add onboardingReducer to the root reducer
});

export default rootReducer;
