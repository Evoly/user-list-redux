import axios from 'axios';

const urlUsers = 'https://jsonplaceholder.typicode.com/users';

export const REQUEST_USER = 'REQUEST_USER';
export const REQUEST_USER_SUCCESS = 'REQUEST_USER_SUCCESS';
export const REQUEST_USER_FAILURE = 'REQUEST_USER_FAILURE';

const requestUsers = () => ({
  type: REQUEST_USER,
});

export default requestUsers;

export const fetchUsersSuccess = (users) => ({
  type: REQUEST_USER_SUCCESS,
  payload: { users },
});

export const fetchUsersFailure = (error) => ({
  type: REQUEST_USER_FAILURE,
  payload: { error },
});

export function fetchUsers(users) {
  return (dispatch) => {
    dispatch(requestUsers(users));
    return axios.get(urlUsers)
      // .then((response) => {
      //   console.log('response', response.data);
      //   return response.data;
      // })
      .then((response) => dispatch(fetchUsersSuccess(response.data)))
      .then((response) => console.log('uesers', response.data));
  };
}
