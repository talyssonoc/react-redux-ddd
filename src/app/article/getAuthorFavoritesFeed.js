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
  return async (authorUsername: string, { onSuccess, onError }: Callbacks) => {
    try {
      const authorFeed = await articleRepository.fromAuthorFavorites(authorUsername);
      onSuccess(authorFeed);
    } catch(error) {
      onError(error);
    }
  };
};
