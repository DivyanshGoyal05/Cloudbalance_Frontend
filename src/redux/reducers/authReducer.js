// const initialState = {
//     username: "",
//     role: "",
//     isLoggedIn: false,
// };

// const authReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case "LOGIN":
//             return {
//                 ...state,
//                 username: action.payload.username,
//                 role: action.payload.role,
//                 isLoggedIn: true,
//             };
//         case "LOGOUT":
//             return {
//                 ...state,
//                 username: "",
//                 role: "",
//                 isLoggedIn: false,
//             };
//         default:
//             return state;
//     }
// };

// export default authReducer;

const initialState = {
    isLoggedIn: false,
    username: null,
    token: null,
    role: null // 'ADMIN', 'READONLY', 'CUSTOMER'
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isLoggedIn: true,
                ...action.payload
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}