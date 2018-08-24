/* @flow */
import type { AuthorRepository } from '../../domain/author';
import typeof * as ConduitApiService from '../conduit/conduitApiService';

type Dependencies = {
  conduitApiService: ConduitApiService
};

export default ({ conduitApiService }: Dependencies): AuthorRepository => ({
  async getByUsername(authorUsername, { currentUser }) {
    const { data } = await conduitApiService
      .authGet(this._profileUrl(authorUsername), currentUser);

    return data.profile;
  },

  async setAsFollowing(authorUsername, { currentUser }) {
    const { data } = await conduitApiService
      .authPost(`${this._profileUrl(authorUsername)}/follow`, currentUser);

    return data.profile;
  },

  async unsetAsFollowing(authorUsername, { currentUser }) {
    const { data } = await conduitApiService
      .authDel(`${this._profileUrl(authorUsername)}/follow`, currentUser);

    return data.profile;
  },

  _profileUrl(authorUsername) {
    return `/profiles/${authorUsername}`;
  }
});
