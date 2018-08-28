/* @flow */
import React, { Component, type Node } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import type { AuthState } from '../../state/auth';
import type { UserState } from '../../state/user';
import ErrorMessages from '../error/ErrorMessages';
import * as auth from '../../state/auth';

type Props = {
  user: $PropertyType<UserState, 'user'>,
  userAuthInfo: $PropertyType<AuthState, 'userAuthInfo'>,
  isLoading: $PropertyType<AuthState, 'isLoading'>,
  errors?: $PropertyType<AuthState, 'errors'>,
  actionTitle?: string,
  showUsernameField: boolean,
  onSubmit: ($PropertyType<Props, 'userAuthInfo'>) => *,
  updateAuthField: typeof auth.updateAuthField,
  renderSwitch: () => Node
};

class AuthPage extends Component<Props> {
  static defaultProps = {
    showUsernameField: false
  };

  updateField = (event) => {
    const { name, value } = event.target;

    this.props.updateAuthField({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      userAuthInfo,
      onSubmit
    } = this.props

    onSubmit(userAuthInfo);
  };

  render() {
    const {
      actionTitle,
      user,
      userAuthInfo,
      errors,
      isLoading,
      showUsernameField,
      renderSwitch
    } = this.props;

    if(user) {
      return <Redirect to="/" />;
    }

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">{ actionTitle }</h1>
              <p className="text-xs-center">
                { renderSwitch() }
              </p>

              <ErrorMessages errors={ errors } />

              <form onSubmit={ this.handleSubmit }>
                <fieldset>
                  {
                    showUsernameField && (
                      <fieldset className="form-group">
                        <input
                          className="form-control form-control-lg"
                          type="username"
                          placeholder="Username"
                          value={ userAuthInfo.username || '' }
                          name="username"
                          onChange={ this.updateField }
                          disabled={ isLoading }
                        />
                      </fieldset>
                    )
                  }

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={ userAuthInfo.email || '' }
                      name="email"
                      onChange={ this.updateField }
                      disabled={ isLoading }
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={ userAuthInfo.password || '' }
                      name="password"
                      onChange={ this.updateField }
                      disabled={ isLoading }
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={ isLoading }
                  >
                    { actionTitle }
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

const mapStateToProps = ({ auth, user }) => ({
  user: user.user,
  userAuthInfo: auth.userAuthInfo,
  isLoading: auth.isLoading,
  errors: auth.errors
});

const mapDispatchToProps = {
  updateAuthField: auth.updateAuthField
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
