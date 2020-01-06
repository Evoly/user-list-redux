import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/comments';

class ComentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      comments: [],
      error: null,
    };
  }


  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const { id } = this.props;
    const urlPosts = id ? `${url}?postId=${id}` : url;
    const response = await axios.get(urlPosts);
    try {
      this.setState({
        comments: response.data,
        isLoading: false,
      });
    } catch (error) {
      this.setState({ error, isLoading: false });
    }
  }

  render() {
    const { name, userId, postTitle } = this.props;

    const title = postTitle ? (
      <h1> Comments on <span> &quot;{postTitle}&quot;</span> </h1>) : <h1> Comment list </h1>;

    const { isLoading, comments } = this.state;

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
  userId: PropTypes.string,
  postTitle: PropTypes.string,
};

ComentsList.defaultProps = {
  id: null,
  name: '',
  userId: null,
  postTitle: '',
};


export default withRouter(ComentsList);
