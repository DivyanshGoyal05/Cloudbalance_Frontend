// const initialState = {
//     roleARN: '',
//     roleName: 'CK-Tuner-Role-dev2',
//     accountname: '',
//     accountid: '',
//     completed: false
// };

// const onboardingReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'SAVE_IAM_ROLE_INFO':
//             return {
//                 ...state,
//                 ...action.payload
//             };
//         case 'COMPLETE_ONBOARDING':
//             return {
//                 ...state,
//                 completed: true,
//                 cloudAccountData: action.payload
//             };
//         default:
//             return state;
//     }
// };

// export default onboardingReducer;

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