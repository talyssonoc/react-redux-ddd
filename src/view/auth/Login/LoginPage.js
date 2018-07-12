import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import linkState from 'linkstate';
import { signInUser } from '../../../state/user';

class Login extends Component {
  static propTypes = {
    signInUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    email: '',
    password: ''
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    const { signInUser, history } = this.props

    const result = await signInUser({ email, password });

    if(result.success) {
      history.push('/');
    }
  };

  render() {
    const { email, password } = this.state;

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
                      value={ email }
                      onChange={ linkState(this, 'email') }
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={ password }
                      onChange={ linkState(this, 'password') }
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

const mapDispatchToProps = {
  signInUser
};

export default withRouter(connect(null, mapDispatchToProps)(Login));
