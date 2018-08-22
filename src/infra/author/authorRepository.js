/* @flow */
import type { AuthorRepository } from '../../domain/author';
import typeof * as ConduitApiService from '../conduit/conduitApiService';

type Dependencies = {
  conduitApiService: ConduitApiService
};

export default ({ conduitApiService }: Dependencies): AuthorRepository => ({
  async getByUsername(authorUsername, { currentUser }) {
    const url = `/profiles/${authorUsername}`;

    const { data } = await conduitApiService.authGet(url, currentUser);

    return data.profile;
  }
});
