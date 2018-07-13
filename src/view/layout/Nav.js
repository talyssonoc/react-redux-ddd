import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
   <nav className="navbar navbar-light">
    <div className="container">
      <a className="navbar-brand" href="index.html">conduit</a>
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          { /* Add "active" class when you're on that page" */ }
          <NavLink
            className="nav-link"
            to="/"
            exact
            activeClassName="active"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="">
            <i className="ion-compose"></i>&nbsp;New Post
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="">
            <i className="ion-gear-a"></i>&nbsp;Settings
          </a>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="/register"
            activeClassName="active"
          >
            Sign up
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default Nav;
