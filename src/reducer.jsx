import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  users: [],
  posts: [],
  userId: 0,
  postId: 0,
  isLoading: false,
  error: null,
};


export function reducer(state = initialState, action) {
  console.log('action', action);
  switch (action.type) {
    case 'REQUEST_USER':
      return { ...state, isLoading: true, error: null };
    case 'REQUEST_USER_SUCCESS':
      return { ...state, isLoading: false, users: action.payload.users };
    case 'REQUEST_POSTS_SUCCESS':
      console.log('state posts', state);
      return { ...state, isLoading: false, posts: action.payload.posts };
    case 'REQUEST_POSTS_BY_ID':
      console.log('state id', state);
      return { ...state, userId: action.payload.userId };
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

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

export default store;
