import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import AuthPage from './AuthPage';
import { signInUser } from '../../state/auth';

class Register extends Component {
  static propTypes = {
    signInUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  handleSuccess = () => {
    this.props.history.push('/');
  };

  render() {
    const { signInUser } = this.props;

    return (
      <AuthPage
        actionTitle="Sign Up"
        onSubmit={ signInUser }
        onSuccess={ this.handleSuccess }
        renderSwitch={ () => <Link to="/login">Have an account?</Link> }
        showUsernameField
      />
    );
  }
}

const mapDispatchToProps = {
  signInUser
};

export default withRouter(connect(null, mapDispatchToProps)(Register));
