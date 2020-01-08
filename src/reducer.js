const initialState = {
  users: [],
  posts: [],
  comments: [],
  userId: 0,
  postId: 0,
  userName: '',
  postTitle: '',
  isLoading: false,
  error: null,
};


function reducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_DATA':
      return { ...state, isLoading: true, error: null };
    case 'REQUEST_USER_SUCCESS':
      return { ...state, isLoading: false, users: action.payload.users };
    case 'REQUEST_USER_FAILURE':
      return {
        ...state,
        isLoading: false,
        users: [],
        error: action.payload.error,
      };
    case 'REQUEST_POSTS_SUCCESS':
      console.log('state posts', state);
      return { ...state, isLoading: false, posts: action.payload.posts };
    case 'REQUEST_POSTS_BY_ID':
      console.log('reducer name', action.payload.userName);
      return { ...state, userId: action.payload.userId, userName: action.payload.userName };
    case 'REQUEST_POSTS_FAILURE':
      return {
        ...state,
        isLoading: false,
        posts: [],
        error: action.payload.error,
      };
    case 'REQUEST_COMMENTS_SUCCESS':
      return { ...state, isLoading: false, comments: action.payload.comments };
    case 'REQUEST_COMMENTS_BY_ID':
      return { ...state, postId: action.payload.postId, postTitle: action.payload.postTitle };
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

export default reducer;
