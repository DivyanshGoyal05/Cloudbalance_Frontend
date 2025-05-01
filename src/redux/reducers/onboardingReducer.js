
const initialState = {
    roleARN: '',
    accountName: '',
    accountId: '',
    isComplete: false
};

export default function onboardingReducer(state = initialState, action) {
    switch (action.type) {
        case 'SAVE_IAM_ROLE_INFO':
            return {
                ...state,
                roleARN: action.payload.roleARN || '',
                accountName: action.payload.accountName || '',
                accountId: action.payload.accountId || ''
            };
        case 'COMPLETE_ONBOARDING':
            return {
                ...state,
                isComplete: true,
                ...action.payload
            };
        case 'CLEAR_ONBOARDING_DATA':
            return initialState;
        default:
            return state;
    }
}