import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import AuthPage from './AuthPage';
import { registerUser } from '../../state/auth';

class Register extends Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  handleSuccess = () => {
    this.props.history.push('/');
  };

  render() {
    const { registerUser } = this.props;

    return (
      <AuthPage
        actionTitle="Sign Up"
        onSubmit={ registerUser }
        onSuccess={ this.handleSuccess }
        renderSwitch={ () => <Link to="/login">Have an account?</Link> }
        showUsernameField
      />
    );
  }
}

const mapDispatchToProps = {
  registerUser
};

export default withRouter(connect(null, mapDispatchToProps)(Register));
