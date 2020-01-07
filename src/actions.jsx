import axios from 'axios';

// const urlUsers = 'https://jsonplaceholder.typicode.com/users';

export const REQUEST_USER = 'REQUEST_USER';
export const REQUEST_USER_SUCCESS = 'REQUEST_USER_SUCCESS';
export const REQUEST_POSTS_SUCCESS = 'REQUEST_POSTS_SUCCESS';
export const REQUEST_POSTS_BY_ID = 'REQUEST_POSTS_BY_ID';
export const REQUEST_USER_FAILURE = 'REQUEST_USER_FAILURE';

const requestUsers = () => ({
  type: REQUEST_USER,
});

export default requestUsers;

export const fetchPostsById = (userId) => {
  console.log('userId action', userId);
  return ({
    type: REQUEST_POSTS_BY_ID,
    payload: { userId },
  });
};

export const fetchUsersSuccess = (users) => ({
  type: REQUEST_USER_SUCCESS,
  payload: { users },
});

export const fetchPostsSuccess = (posts, userId) => ({
  type: REQUEST_POSTS_SUCCESS,
  payload: { posts, userId },
});

export const fetchUsersFailure = (error) => ({
  type: REQUEST_USER_FAILURE,
  payload: { error },
});

export function fetchUsers(url) {
  return (dispatch) => {
    console.log('hello');
    dispatch(requestUsers());
    return axios.get(url)
      .then((response) => dispatch(fetchUsersSuccess(response.data)))
      .then((response) => console.log('uesers', response.data));
  };
}

export function fetchPosts(url, state) {
  return (dispatch) => {
    const { userId } = state;
    console.log('hello fetchPosts', userId);
    dispatch(requestUsers());
    const urlPosts = userId > 0 ? `${url}?userId=${userId}` : url;
    console.log('userId', userId);
    return axios.get(urlPosts)
      // .then((response) => {
      //   console.log('response', response.data);
      //   return response.data;
      // })
      .then((response) => dispatch(fetchPostsSuccess(response.data)))
      .then((response) => console.log('response.data posts', response.data));
  };
}
