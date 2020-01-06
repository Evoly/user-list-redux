import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <div className="container">
      <nav className="nav flex">
        <Link to="/" className="nav__link" title="Home">Home</Link>
        <Link
          to={{
            pathname: '/posts',
            userId: null,
            userName: null,
          }}
          className="nav__link"
          title="All posts"
        >
          Posts
        </Link>
        <Link
          to={{
            pathname: '/comments',
            postId: null,
            userId: null,
            name: null,
            postTitle: null,
          }}
          className="nav__link"
          title="All comments"
        >
          Comments
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;
