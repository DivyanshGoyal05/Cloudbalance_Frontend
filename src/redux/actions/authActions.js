// // Synchronous action creators
// export const setUsers = (users) => ({
//     type: 'SET_USERS',
//     payload: users
// });

// export const addUser = (user) => ({
//     type: 'ADD_USER',
//     payload: user
// });

// export const updateUser = (user) => ({
//     type: 'UPDATE_USER',
//     payload: user
// });

// export const setAccounts = (accounts) => ({
//     type: 'SET_ACCOUNTS',
//     payload: accounts
// });

// // Async action example (without Thunk middleware)
// export const fetchUsers = () => {
//     return async (dispatch) => {
//         dispatch({ type: 'FETCH_USERS_START' });
//         try {
//             const response = await axios.get('/users/fetchall', {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
//             });
//             dispatch(setUsers(response.data));
//             dispatch({ type: 'FETCH_USERS_SUCCESS' });
//         } catch (error) {
//             dispatch({ type: 'FETCH_USERS_ERROR', payload: error.message });
//         }
//     };
// };

export const loginSuccess = (userData) => ({
    type: 'LOGIN_SUCCESS',
    payload: userData
});

export const logout = () => ({
    type: 'LOGOUT'
});

