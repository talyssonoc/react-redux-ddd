/* @flow */
import type { UserRepository } from '../../domain/user';
import typeof * as ConduitApiService from '../conduit/conduitApiService';

type Dependencies = {
  conduitApiService: ConduitApiService
};

export default ({ conduitApiService }: Dependencies): UserRepository => ({
  byAuthInfo(userAuthInfo) {
    return this._authUser(userAuthInfo, 'users/login');
  },

  add(user) {
    return this._authUser(user, 'users');
  },

  async update(editingUser, { currentUser }) {
    const { data } = await conduitApiService.authPut('user', currentUser, {
      user: this._serializeUserData(editingUser)
    });

    return data.user;
  },

  async _authUser(user, url) {
    const { data } = await conduitApiService.post(url, { user });

    return data.user;
  },

  _serializeUserData({ email, username, bio, image, password }) {
    return {
      email,
      username,
      bio,
      image,
      password
    };
  }
});
