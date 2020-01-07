import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const initialState = {
  users: [],
  posts: [],
  comments: [],
  userId: 0,
  postId: 0,
  isLoading: false,
  error: null,
};

function requestData(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_DATA':
      return { ...state, isLoading: true, error: null };
    default:
      return state;
  }
}

function requestUsers(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_USER_SUCCESS':
      return { ...state, isLoading: false, users: action.payload.users };
    case 'REQUEST_USER_FAILURE':
      return {
        ...state,
        isLoading: false,
        users: [],
        error: action.payload.error,
      };
    default:
      return state;
  }
}

function requestPosts(state = initialState, action) {
  console.log('action', action);
  switch (action.type) {
    case 'REQUEST_POSTS_SUCCESS':
      console.log('state posts', state);
      return { ...state, isLoading: false, posts: action.payload.posts };
    case 'REQUEST_POSTS_BY_ID':
      return { ...state, userId: action.payload.userId };
    case 'REQUEST_POSTS_FAILURE':
      return {
        ...state,
        isLoading: false,
        posts: [],
        error: action.payload.error,
      };
    default:
      return state;
  }
}

function requestComments(state = initialState, action) {
  console.log('action', action);
  switch (action.type) {
    case 'REQUEST_COMMENTS_SUCCESS':
      return { ...state, isLoading: false, comments: action.payload.comments };
    case 'REQUEST_COMMENTS_BY_ID':
      return { ...state, postId: action.payload.postId };
    case 'REQUEST_COMMENTS_FAILURE':
      return {
        ...state,
        isLoading: false,
        comments: [],
        error: action.payload.error,
      };
    default:
      return state;
  }
}

// export function reducer(state = initialState, action) {
//   console.log('action', action);
//   switch (action.type) {
//     case 'REQUEST_DATA':
//       return { ...state, isLoading: true, error: null };
//     case 'REQUEST_USER_SUCCESS':
//       return { ...state, isLoading: false, users: action.payload.users };
//     case 'REQUEST_POSTS_SUCCESS':
//       console.log('state posts', state);
//       return { ...state, isLoading: false, posts: action.payload.posts };
//     case 'REQUEST_POSTS_BY_ID':
//       return { ...state, userId: action.payload.userId };
//     case 'REQUEST_USER_FAILURE':
//       return {
//         ...state,
//         isLoading: false,
//         users: [],
//         error: action.payload.error,
//       };
//     default:
//       return state;
//   }
// }


const reducer = combineReducers({
  requestData,
  requestUsers,
  requestPosts,
  requestComments,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

export default store;
