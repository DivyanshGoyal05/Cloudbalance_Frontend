const initialState = {
    users: [],
    accounts: [],
    loading: false
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USERS':
            return { ...state, users: action.payload };
        case 'SET_ACCOUNTS':
            return { ...state, accounts: action.payload };
        case 'ADD_USER':
            return { ...state, users: [...state.users, action.payload] };
        case 'UPDATE_USER':
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.payload.id ? action.payload : user
                )
            };
        default:
            return state;
    }
}