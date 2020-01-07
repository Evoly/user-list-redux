import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
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
    error: state.error,
  };
  console.log('props postlist', props);
  return props;
};

class PostsList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts(url, this.props));
  }

  render() {
    const handleClick = (id) =>  this.props.dispatch(fetchCommentsById(id));

    const { name } = this.props;
    const title = name ? `${name} posts` : 'Posts list';
    const { isLoading, posts } = this.props;
    console.log('posts props', this.props);
    console.log('posts', posts);

    let content = [];

    if (!isLoading) {
      // const { userId } = posts[0] ? posts[0] : 0;

      content = posts.map(({
        title, body, id, userId,
      }) => (
        <React.Fragment key={id}>
          <div className="content__item">
            <Link
              to={{
                pathname: '/comments',
              }}
              onClick={() => handleClick(id)}
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
        <h1> {title} </h1>
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
  id: PropTypes.number,
  name: PropTypes.string,
};

PostsList.defaultProps = {
  id: null,
  name: '',
};

export default connect(mapStateToProps)(PostsList);
