/* @flow */
import type { UserRepository } from '../../domain/user';
import typeof * as ConduitApiService from '../conduit/conduitApiService';

type Dependencies = {
  conduitApiService: ConduitApiService
};

export default ({ conduitApiService }: Dependencies): UserRepository => ({
  fromAuthInfo(userAuthInfo) {
    return this._authUser(userAuthInfo, 'users/login');
  },

  add(user) {
    return this._authUser(user, 'users');
  },

  async _authUser(user, url) {
    const { data } = await conduitApiService.post(url, { user });

    return data.user;
  }
});
