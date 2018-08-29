/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Head from '../layout/Head';
import {
  loadEditingUser,
  updateUserField,
  updateSettings,
  resetSettingsPage,
  SettingsStatuses,
  type SettingsState
} from '../../state/settings';
import { signOutUser } from '../../state/auth';

import { type UserState } from '../../state/user';

type Props = {
  user: $PropertyType<UserState, 'user'>,
  editingUser: $PropertyType<SettingsState, 'user'>,
  status: $PropertyType<SettingsState, 'status'>,
  loadEditingUser: typeof loadEditingUser,
  updateUserField: typeof updateUserField,
  updateSettings: typeof updateSettings,
  resetSettingsPage: typeof resetSettingsPage,
  signOutUser: typeof signOutUser
};

class SettingsPage extends Component<Props> {
  componentDidMount() {
    this.props.loadEditingUser();
  }

  componentWillUnmount() {
    this.props.resetSettingsPage();
  }

  updateField = (event) => {
    const { name, value } = event.target;

    this.props.updateUserField({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateSettings();
  };

  render() {
    const {
      user,
      editingUser,
      status,
      signOutUser
    } = this.props;

    if(user && status === SettingsStatuses.SAVED) {
      return <Redirect to={ `/@${user.username}` } />;
    }

    if(!editingUser) {
      return null;
    }

    const isSaving = status === SettingsStatuses.SAVING;

    return (
      <div className="settings-page">
        <Head title="Settings" />

        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <form onSubmit={ this.handleSubmit }>
                <fieldset>
                    <fieldset className="form-group">
                      <input
                        disabled={ isSaving }
                        onChange={ this.updateField }
                        value={ editingUser.image || '' }
                        name="image"
                        className="form-control"
                        type="text"
                        placeholder="URL of profile picture"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        disabled={ isSaving }
                        onChange={ this.updateField }
                        value={ editingUser.username || '' }
                        name="username"
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Your Name"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <textarea
                        disabled={ isSaving }
                        onChange={ this.updateField }
                        value={ editingUser.bio || '' }
                        name="bio"
                        className="form-control form-control-lg"
                        rows="8"
                        placeholder="Short bio about you"
                      ></textarea>
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        disabled={ isSaving }
                        onChange={ this.updateField }
                        value={ editingUser.email || '' }
                        name="email"
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Email"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        disabled={ isSaving }
                        onChange={ this.updateField }
                        value={ editingUser.password || '' }
                        name="password"
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Password"
                      />
                    </fieldset>
                    <button
                      disabled={ isSaving }
                      type="submit"
                      className="btn btn-lg btn-primary pull-xs-right"
                    >
                      Update Settings
                    </button>
                </fieldset>
                <hr />
                <button
                  onClick={ signOutUser }
                  className="btn btn-outline-danger"
                >
                  Or click here to logout.
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ settings, user }) => ({
  editingUser: settings.user,
  user: user.user,
  status: settings.status
});

const mapDispatchToProps = {
  loadEditingUser,
  updateUserField,
  updateSettings,
  resetSettingsPage,
  signOutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
