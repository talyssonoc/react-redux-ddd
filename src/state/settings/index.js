/* @flow */
import type { Dispatch, Reducer } from 'redux';
import typeof * as Container from '../../container';
import type { EditingUser } from '../../domain/user';
import type { GetState } from '../store';
import { SETTINGS, USER } from '../actionTypes';

export const SettingsStatuses = {
  INIT: 'INIT',
  SAVING: 'SAVING',
  SAVED: 'SAVED',
  FAILED_SAVING: 'FAILED_SAVING'
};

export type SettingsStatus = $Keys<typeof SettingsStatuses>;

export type SettingsState = {
  user: EditingUser,
  status: SettingsStatus
};

const initialState = {
  user: {
    email: '',
    username: '',
    bio: '',
    image: '',
    password: ''
  },
  status: SettingsStatuses.INIT
};

export const settingsReducer: Reducer<SettingsState, any> = (state = initialState, action) => {
  switch(action.type) {
    case SETTINGS.LOAD_EDITING_USER:
      return {
        ...state,
        status: SettingsStatuses.INIT,
        user: action.user
      };

    case SETTINGS.UPDATE_USER_FIELD:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.user
        }
      };

    case USER.UPDATE_SETTINGS_REQUEST:
      return {
        ...state,
        status: SettingsStatuses.SAVING
      };

    case USER.UPDATE_SETTINGS_SUCCESS:
      return {
        ...state,
        status: SettingsStatuses.SAVED
      };

    case USER.UPDATE_SETTINGS_ERROR:
      return {
        ...state,
        status: SettingsStatuses.FAILED_SAVING
      };

    case SETTINGS.RESET:
      return initialState;

    default:
      return state;
  }
};

export const loadEditingUser = () => (dispatch: Dispatch<any>, getState: GetState) => {
  const { user } = getState().user;

  dispatch({
    type: SETTINGS.LOAD_EDITING_USER,
    user
  });
};

export const updateUserField = (user: $Shape<EditingUser>) => ({
  type: SETTINGS.UPDATE_USER_FIELD,
  user
});

export const updateSettings = () => {
  return (dispatch: Dispatch<any>, getState: GetState, container: Container) => {
    dispatch(updateSettingsRequest);

    const {
      user: { user: currentUser },
      settings: { user: editingUser }
    } = getState();

    container.changeSettings(editingUser, { currentUser }, {
      onSuccess: (updatedUser) => dispatch(updateSettingsSuccess(updatedUser)),
      onError: (errors) => dispatch(updateSettingsError(errors))
    });
  };
};

const updateSettingsRequest = {
  type: USER.UPDATE_SETTINGS_REQUEST
};

const updateSettingsSuccess = (updatedUser) => ({
  type: USER.UPDATE_SETTINGS_SUCCESS,
  user: updatedUser
});

const updateSettingsError = (errors) => ({
  type: USER.UPDATE_SETTINGS_ERROR,
  errors
});

export const resetSettingsPage = () => ({
  type: SETTINGS.RESET
});
