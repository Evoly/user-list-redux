import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';

import reducer from './reducer';
import UserList from './component/UserList';
import PostsList from './component/PostsList';
import CommentsList from './component/CommentsList';
import Header from './component/Header';
// import NotFound from './component/NotFound';

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

const Comments = () => (
  <CommentsList />
);

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
