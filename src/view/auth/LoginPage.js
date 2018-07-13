import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { updateAuthField, signInUser } from '../../state/auth';

class Login extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    errors: PropTypes.array,
    signInUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  updateField = (event) => {
    const { name, value } = event.target;

    this.props.updateAuthField({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const {
      user,
      signInUser, history
    } = this.props

    const result = await signInUser(user);

    if(result.success) {
      history.push('/');
    }
  };

  render() {
    const { user } = this.props;

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <Link to="/register">
                  Need an account?
                </Link>
              </p>

              <form onSubmit={ this.handleSubmit }>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={ user.email || '' }
                      name="email"
                      onChange={ this.updateField }
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={ user.password || '' }
                      name="password"
                      onChange={ this.updateField }
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                  >
                    Sign in
                  </button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
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
