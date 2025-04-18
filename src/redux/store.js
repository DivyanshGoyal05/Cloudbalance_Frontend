import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import onboardingReducer from './reducers/onboardingReducer';

// Persist config (only auth and onboarding)
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'onboarding']
};

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    onboarding: onboardingReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with DevTools support
export const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__?.()
);

export const persistor = persistStore(store);