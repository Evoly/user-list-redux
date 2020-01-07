import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchUsers, fetchPostsById } from '../actions';

const urlUsers = 'https://jsonplaceholder.typicode.com/users';

const mapStateToProps = (state) => {
  const props = {
    isLoading: state.isLoading,
    users: state.users,
    userId: state.id,
    error: state.error,
  };
  return props;
};


class UserList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUsers(urlUsers));
  }

  render() {
    const { isLoading, users } = this.props;
    let content = [];

    const handleClick = (id) =>  this.props.dispatch(fetchPostsById(id));

    if (!isLoading) {
      content = users.map(({ name, id }) => (
        <React.Fragment key={id}>
          <li className="content__item">
            <Link
              to={{
                pathname: '/posts',
              }}
              onClick={() => handleClick(id)}
              className="content__link"
            >
              {name}
            </Link>
          </li>
        </React.Fragment>
      ));
    } else {
      content = <p>Loading...</p>;
    }

    return (
      <>
        <h1> User list</h1>
        <ul className="content flex">
          {content}
        </ul>
      </>

    );
  }
}

UserList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default connect(mapStateToProps)(UserList);
