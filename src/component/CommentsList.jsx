import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchComments } from '../actions';

const url = 'https://jsonplaceholder.typicode.com/comments';

const mapStateToProps = (state) => {
  const props = {
    isLoading: state.isLoading,
    comments: state.comments,
    userId: state.userId,
    postId: state.postId,
    error: state.error,
  };
  console.log('props comments', props);
  return props;
};

class ComentsList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchComments(url, this.props));
  }

  render() {
    const { name, userId, postTitle } = this.props;

    const title = postTitle ? (
      <h1> Comments on <span> &quot;{postTitle}&quot;</span> </h1>) : <h1> Comment list </h1>;

    const { isLoading, comments } = this.props;

    let content = [];

    if (!isLoading) {
      content = comments.map(({ name, body, id }) => (
        <React.Fragment key={id}>
          <div className="content__item">
            <p className="content__title">{name}</p>
            <p>{body}</p>
          </div>
        </React.Fragment>
      ));
    } else {
      content = <p>Loading...</p>;
    }

    return (
      <>
        {title}
        <div className="content">
          {content}
          <Link
            to={{
              pathname: '/posts',
              userId,
              userName: name,
            }}
            className="btn"
          >
            Back
          </Link>
        </div>
      </>
    );
  }
}

ComentsList.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  userId: PropTypes.number,
  postTitle: PropTypes.string,
};

ComentsList.defaultProps = {
  id: null,
  name: '',
  userId: null,
  postTitle: '',
};

export default connect(mapStateToProps)(ComentsList);
