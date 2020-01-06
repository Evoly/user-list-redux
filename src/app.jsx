import React from 'react';
import PropTypes from 'prop-types';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';

import UserList from './component/UserList';
import PostsList from './component/PostsList';
import CommentsList from './component/CommentsList';
import Header from './component/Header';
// import NotFound from './component/NotFound';

const initialState = {
  users: [],
  posts: [],
  userId: 2,
  isLoading: false,
  error: null,
};


function reducer(state = initialState, action) {
  console.log('action', action);
  switch (action.type) {
    case 'REQUEST_USER':
      return { ...state, isLoading: true, error: null };
    case 'REQUEST_USER_SUCCESS':
      return { ...state, isLoading: false, users: action.payload.users };
    case 'REQUEST_POSTS_SUCCESS':
      console.log('state posts', state);
      return { ...state, isLoading: false, posts: action.payload.posts };
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

const Comments = (props) => {
  const { location } = props;
  return (
    <CommentsList
      id={location.postId}
      name={location.name}
      userId={location.userId}
      postTitle={location.postTitle}
    />
  );
};

Comments.propTypes = {
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const Posts = () => (
  <PostsList />
);

const Home = () => (
  <UserList />
);

const Main = () => (
  <main className="container">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/posts" component={Posts} />
      <Route path="/comments" component={Comments} />
      <Route path="*" component={Home} />
    </Switch>
  </main>
);

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Header />
        <Main />
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
