/* @flow */
import type { AuthorRepository } from '../../domain/author';
import typeof * as ConduitApiService from '../conduit/conduitApiService';

type Dependencies = {
  conduitApiService: ConduitApiService
};

export default ({ conduitApiService }: Dependencies): AuthorRepository => ({
  async getByUsername(authorUsername, { currentUser }) {
    const url = `/profiles/${authorUsername}`;

    let response;

    if(currentUser) {
      response = await conduitApiService.authGet(url, currentUser);
    } else {
      response = await conduitApiService.get(url);
    }

    const { data } = response;

    return data.profile;
  }
});
