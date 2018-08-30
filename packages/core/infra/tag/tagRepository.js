/* @flow */
import type { TagRepository } from '../../domain/tag';
import typeof * as ConduitApiService from '../conduit/conduitApiService';

type Dependencies = {
  conduitApiService: ConduitApiService
};

export default ({ conduitApiService }: Dependencies): TagRepository => ({
  async getPopularTags() {
    const { data } = await conduitApiService.get('tags');

    return data.tags;
  }
});
