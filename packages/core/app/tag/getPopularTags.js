/* @flow */
import type { Tag, TagRepository } from '../../domain/tag';

type Dependencies = {
  tagRepository: TagRepository
};

type Callbacks = {
  onSuccess: (Array<Tag>) => void,
  onError: (Error) => void
};

export default ({ tagRepository }: Dependencies) => {
  return async ({ onSuccess, onError }: Callbacks) => {
    try {
      const popularTags = await tagRepository.getPopularTags();
      onSuccess(popularTags);
    } catch(error) {
      onError(error);
    }
  };
};
