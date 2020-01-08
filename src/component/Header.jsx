import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <div className="container">
      <nav className="nav flex">
        <Link to="/" className="nav__link" title="Home">Home</Link>
        <Link
          to={{
            pathname: '/posts',
          }}
          className="nav__link"
        >
          Posts
        </Link>
        <Link
          to={{
            pathname: '/comments',
          }}
          className="nav__link"
        >
          Comments
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;
