import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthPage from './AuthPage';
import { registerUser } from '../../state/auth';

class Register extends Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired
  };

  render() {
    const { registerUser } = this.props;

    return (
      <AuthPage
        actionTitle="Sign Up"
        onSubmit={ registerUser }
        renderSwitch={ () => <Link to="/login">Have an account?</Link> }
        showUsernameField
      />
    );
  }
}

const mapDispatchToProps = {
  registerUser
};

export default connect(null, mapDispatchToProps)(Register);
