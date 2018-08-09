/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthPage from './AuthPage';
import { signInUser } from '../../state/auth';

type Props = { signInUser: Function };

class LoginPage extends Component<Props> {
  render() {
    const { signInUser } = this.props;

    return (
      <AuthPage
        actionTitle="Sign in"
        onSubmit={ signInUser }
        renderSwitch={ () => <Link to="/register">Need an account?</Link> }
      />
    );
  }
}

const mapDispatchToProps = {
  signInUser
};

export default connect(null, mapDispatchToProps)(LoginPage);
