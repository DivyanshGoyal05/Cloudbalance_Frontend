const initialState = {
    roleARN: '',
    accountname: '',
    accountid: '',
    currentStep: 1
};

export default function onboardingReducer(state = initialState, action) {
    switch (action.type) {
        case 'SAVE_IAM_ROLE_INFO':
            return { ...state, ...action.payload };
        case 'RESET_ONBOARDING':
            return initialState;
        default:
            return state;
    }
}