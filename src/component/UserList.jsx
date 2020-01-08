import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchUsers, fetchPostsById } from '../actions';

const urlUsers = 'https://jsonplaceholder.typicode.com/users';

const mapStateToProps = (state) => {
  const props = {
    isLoading: state.isLoading,
    users: state.users,
    userId: state.id,
    userName: state.userName,
    error: state.error,
  };
  return props;
};


class UserList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUsers(urlUsers)); // eslint-disable-line
  }

  handleClick = (id, name) => {
    console.log('users name', name);
    this.props.dispatch(fetchPostsById(id, name)); // eslint-disable-line
  }

  render() {
    const { isLoading, users } = this.props;
    let content = [];

    if (!isLoading) {
      content = users.map(({ name, id }) => (
        <React.Fragment key={id}>
          <li className="content__item">
            <Link
              to={{
                pathname: '/posts',
              }}
              onClick={() => this.handleClick(id, name)}
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
