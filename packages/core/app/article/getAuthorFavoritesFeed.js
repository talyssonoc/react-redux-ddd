/* @flow */
import type { WithCurrentUser } from '../../domain/user';
import type { Feed, ArticleRepository } from '../../domain/article';

type Dependencies = {
  articleRepository: ArticleRepository
};

type Options = WithCurrentUser;

type Callbacks = {
  onSuccess: (Feed) => void,
  onError: (Error) => void
};

export default ({ articleRepository }: Dependencies) => {
  return async (authorUsername: string, { currentUser }: Options, { onSuccess, onError }: Callbacks) => {
    try {
      const authorFeed = await articleRepository.fromAuthorFavorites(authorUsername, { currentUser });
      onSuccess(authorFeed);
    } catch(error) {
      onError(error);
    }
  };
};
