// // src/redux/actions/userActions.js
// export const fetchUsers = () => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: 'USER_ACTION_START' });

//       const token = localStorage.getItem("authToken");
//       const response = await axios.get(`${URL}/users/fetchall`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       dispatch({
//         type: 'FETCH_USERS_SUCCESS',
//         payload: response.data
//       });

//     } catch (error) {
//       dispatch({
//         type: 'USER_ACTION_ERROR',
//         payload: error.message
//       });
//     }
//   };
// };

// export const fetchAccounts = () => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: 'USER_ACTION_START' });

//       const token = localStorage.getItem("authToken");
//       const response = await axios.get(`${URL}/cloudAccount/getall`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       dispatch({
//         type: 'FETCH_ACCOUNTS_SUCCESS',
//         payload: response.data
//       });

//     } catch (error) {
//       dispatch({
//         type: 'USER_ACTION_ERROR',
//         payload: error.message
//       });
//     }
//   };
// };

// export const saveUser = (userData) => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: 'USER_ACTION_START' });

//       const token = localStorage.getItem("authToken");
//       const headers = { Authorization: `Bearer ${token}` };

//       let response;
//       if (userData.id) {
//         // Update existing user
//         response = await axios.put(
//           `${URL}/users/${userData.id}`,
//           userData,
//           { headers }
//         );
//       } else {
//         // Create new user
//         response = await axios.post(
//           `${URL}/users/create`,
//           userData,
//           { headers }
//         );
//       }

//       dispatch({
//         type: 'SAVE_USER_SUCCESS',
//         payload: response.data
//       });

//     } catch (error) {
//       dispatch({
//         type: 'USER_ACTION_ERROR',
//         payload: error.message
//       });
//     }
//   };
// };

export const setUsers = (users) => ({
  type: 'SET_USERS',
  payload: users
});

export const setAccounts = (accounts) => ({
  type: 'SET_ACCOUNTS',
  payload: accounts
});