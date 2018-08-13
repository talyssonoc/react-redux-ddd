/* @flow */
import type { Feed, ArticleRepository } from '../../domain/article';
import type { Tag } from '../../domain/tag';

type Dependencies = {
  articleRepository: ArticleRepository
};

type Callbacks = {
  onSuccess: (Feed) => void,
  onError: (Error) => void
};

export default ({ articleRepository }: Dependencies) => {
  return async (tag: Tag, { onSuccess, onError }: Callbacks) => {
    try {
      const globalFeed = await articleRepository.fromTagFeed(tag);
      onSuccess(globalFeed);
    } catch(error) {
      onError(error);
    }
  };
};
