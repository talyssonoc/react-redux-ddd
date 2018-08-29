/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthPage from './AuthPage';
import * as auth from '../../state/auth';

type Props = {
  registerUser: typeof auth.registerUser
};

class Register extends Component<Props> {
  render() {
    const { registerUser } = this.props;

    return (
      <AuthPage
        actionTitle="Sign up"
        onSubmit={ registerUser }
        renderSwitch={ () => <Link to="/login">Have an account?</Link> }
        showUsernameField
      />
    );
  }
}

const mapDispatchToProps = {
  registerUser: auth.registerUser
};

export default connect(null, mapDispatchToProps)(Register);
