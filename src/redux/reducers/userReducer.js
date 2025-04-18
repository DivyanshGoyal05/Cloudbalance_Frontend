// const initialState = {
//     users: [],
//     accounts: [],
//     loading: false,
//     error: null
// };

// export default function userReducer(state = initialState, action) {
//     switch (action.type) {
//         // User actions
//         case 'SET_USERS':
//             return { ...state, users: action.payload };
//         case 'ADD_USER':
//             return { ...state, users: [...state.users, action.payload] };
//         case 'UPDATE_USER':
//             return {
//                 ...state,
//                 users: state.users.map(user =>
//                     user.id === action.payload.id ? action.payload : user
//                 )
//             };

//         // Account actions
//         case 'SET_ACCOUNTS':
//             return { ...state, accounts: action.payload };

//         // Loading states
//         case 'FETCH_USERS_START':
//             return { ...state, loading: true };
//         case 'FETCH_USERS_SUCCESS':
//             return { ...state, loading: false };
//         case 'FETCH_USERS_ERROR':
//             return { ...state, loading: false, error: action.payload };

//         default:
//             return state;
//     }
// }


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