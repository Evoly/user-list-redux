import axios from 'axios';

const REQUEST_DATA = 'REQUEST_DATA';
const REQUEST_USER_SUCCESS = 'REQUEST_USER_SUCCESS';
const REQUEST_USER_FAILURE = 'REQUEST_USER_FAILURE';

const REQUEST_POSTS_SUCCESS = 'REQUEST_POSTS_SUCCESS';
const REQUEST_POSTS_BY_ID = 'REQUEST_POSTS_BY_ID';
const REQUEST_POSTS_FAILURE = 'REQUEST_POSTS_FAILURE';

const REQUEST_COMMENTS_SUCCESS = 'REQUEST_COMMENTS_SUCCESS';
const REQUEST_COMMENTS_BY_ID = 'REQUEST_COMMENTS_BY_ID';
const REQUEST_COMMENTS_FAILURE = 'REQUEST_COMMENTS_FAILURE';


const requestData = () => ({
  type: REQUEST_DATA,
});
export default requestData;

export const fetchUsersSuccess = (users) => ({
  type: REQUEST_USER_SUCCESS,
  payload: { users },
});

export const fetchUsersFailure = (error) => ({
  type: REQUEST_USER_FAILURE,
  payload: { error },
});

export const fetchPostsById = (userId, userName) => ({
  type: REQUEST_POSTS_BY_ID,
  payload: { userId, userName },
});

export const fetchPostsSuccess = (posts, userId) => ({
  type: REQUEST_POSTS_SUCCESS,
  payload: { posts, userId },
});

export const fetchPostsFailure = (error) => ({
  type: REQUEST_POSTS_FAILURE,
  payload: { error },
});

export const fetchCommentsById = (postId, postTitle) => {
  console.log('postId action', postId);
  return ({
    type: REQUEST_COMMENTS_BY_ID,
    payload: { postId, postTitle },
  });
};

export const fetchCommentsSuccess = (comments, postId) => ({
  type: REQUEST_COMMENTS_SUCCESS,
  payload: { comments, postId },
});

export const fetchCommentsFailure = (error) => ({
  type: REQUEST_COMMENTS_FAILURE,
  payload: { error },
});


export function fetchUsers(url) {
  return (dispatch) => {
    dispatch(requestData());
    return axios.get(url)
      .then((response) => dispatch(fetchUsersSuccess(response.data)));
  };
}

export function fetchPosts(url, state) {
  return (dispatch) => {
    const { userId } = state;
    dispatch(requestData());
    const urlPosts = userId > 0 ? `${url}?userId=${userId}` : url;
    return axios.get(urlPosts)
      .then((response) => dispatch(fetchPostsSuccess(response.data)));
  };
}

export function fetchComments(url, state) {
  return (dispatch) => {
    const { postId } = state;
    dispatch(requestData());
    const urlPosts = postId > 0 ? `${url}?postId=${postId}` : url;
    return axios.get(urlPosts)
      .then((response) => dispatch(fetchCommentsSuccess(response.data)));
  };
}
