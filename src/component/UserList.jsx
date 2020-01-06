import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import requestUsers, { fetchUsers } from '../actions';

// const urlUsers = 'https://jsonplaceholder.typicode.com/users';

const mapStateToProps = (state) => {
  const props = {
    isLoading: state.isLoading,
    users: state.users,
    error: state.error,
  };
  return props;
};

class UserList extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isLoading: true,
  //     users: [],
  //     error: null,
  //   };
  // }

  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  // componentDidMount() {
  //   this.fetchData();
  // }

  // async fetchData() {
  //   const response = await axios.get(urlUsers);
  //   try {
  //     this.setState({
  //       users: response.data,
  //       isLoading: false,
  //     });
  //   } catch (error) {
  //     this.setState({ error, isLoading: false });
  //   }
  // }

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
                userId: id,
                userName: name,
              }}
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

export default connect(mapStateToProps)(UserList);
