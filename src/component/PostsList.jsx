import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchPosts, fetchCommentsById } from '../actions';

const url = 'https://jsonplaceholder.typicode.com/posts';

const mapStateToProps = (state) => {
  const props = {
    isLoading: state.isLoading,
    posts: state.posts,
    userId: state.userId,
    postId: state.postId,
    userName: state.userName,
    postTitle: state.postTitle,
    error: state.error,
  };
  console.log('props postlist', props);
  return props;
};

class PostsList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts(url, this.props)); // eslint-disable-line
  }

  handleClick(id, title) {
    this.props.dispatch(fetchCommentsById(id, title)); // eslint-disable-line
  }

  render() {
    const { userName } = this.props;
    console.log('posts this.props', this.props);
    console.log('name', userName);
    const postTitle = userName ? `${userName} posts` : 'Posts list';
    const { isLoading, posts } = this.props;

    let content = [];

    if (!isLoading) {
      content = posts.map(({
        title, body, id,
      }) => (
        <React.Fragment key={id}>
          <div className="content__item">
            <Link
              to={{
                pathname: '/comments',
              }}
              onClick={() => this.handleClick(id, title)}
              className="content__link"
            >
              {title}
            </Link>
          </div>
          <p>{body}</p>
        </React.Fragment>
      ));
    } else {
      content = <p>Loading...</p>;
    }

    return (
      <>
        <h1> {postTitle} </h1>
        <div className="content">
          {content}
          <Link to="/" className="btn">Back</Link>
        </div>
      </>
    );
  }
}

PostsList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  userName: PropTypes.string,
};

PostsList.defaultProps = {
  userName: '',
};

export default connect(mapStateToProps)(PostsList);
