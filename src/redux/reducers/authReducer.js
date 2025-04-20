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