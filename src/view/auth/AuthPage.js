import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorMessages from '../error/ErrorMessages';

class AuthPage extends Component {
  static propTypes = {
    actionTitle: PropTypes.string,
    user: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    updateAuthField: PropTypes.func.isRequired,
    renderSwitch: PropTypes.func.isRequired
  };

  updateField = (event) => {
    const { name, value } = event.target;

    this.props.updateAuthField({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const {
      user,
      onSubmit,
      onSuccess
    } = this.props

    const result = await onSubmit(user);

    if(result.success) {
      onSuccess();
    }
  };

  render() {
    const {
      actionTitle,
      user,
      errors,
      renderSwitch
    } = this.props;

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

export default AuthPage;
