/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthPage from './AuthPage';
import * as auth from '../../state/auth';

type Props = {
  signInUser: typeof auth.signInUser
};

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
  signInUser: auth.signInUser
};

export default connect(null, mapDispatchToProps)(LoginPage);
