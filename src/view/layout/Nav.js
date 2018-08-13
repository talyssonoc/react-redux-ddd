/* @flow */
import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import type { User } from '../../domain/user';

type Props = {
  user: User
};

const Nav = (props: Props) => (
   <nav className="navbar navbar-light">
    <div className="container">
      <Link className="navbar-brand" to="/">conduit</Link>
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="/"
            exact
            activeClassName="active"
          >
            Home
          </NavLink>
        </li>
        {
          props.user && (
            <Fragment>
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
            </Fragment>
          )
        }
        {
          !props.user && (
            <Fragment>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/login"
                  activeClassName="active"
                >
                  Sign In
                </NavLink>
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
            </Fragment>
          )
        }
      </ul>
    </div>
  </nav>
);

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps)(Nav);
