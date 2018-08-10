/* @flow */
import type { Feed, ArticleRepository } from '../../domain/article';

type Dependencies = {
  articleRepository: ArticleRepository
};

type Callbacks = {
  onSuccess: (Feed) => void,
  onError: (Error) => void
};

export default ({ articleRepository }: Dependencies) => {
  return async ({ onSuccess, onError }: Callbacks) => {
    try {
      const globalFeed = await articleRepository.fromGlobalFeed();
      onSuccess(globalFeed);
    } catch(error) {
      onError(error);
    }
  };
};
