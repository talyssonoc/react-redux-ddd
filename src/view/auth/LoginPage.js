import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import AuthPage from './AuthPage';
import { updateAuthField, signInUser } from '../../state/auth';

class Login extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    errors: PropTypes.object,
    signInUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  handleSuccess = () => {
    this.props.history.push('/');
  };

  render() {
    const {
      user, errors,
      signInUser,
      updateAuthField
    } = this.props;

    return (
      <AuthPage
        actionTitle="Sign In"
        user={ user }
        errors={ errors }
        onSubmit={ signInUser }
        onSuccess={ this.handleSuccess }
        updateAuthField={ updateAuthField }
        renderSwitch={ () => <Link to="/register">Need an account?</Link> }
      />
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
  isLoading: auth.isLoading,
  errors: auth.errors
});

const mapDispatchToProps = {
  signInUser,
  updateAuthField
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
