/* @flow */
import type { User } from '../../domain/user';
import type { Feed, ArticleRepository } from '../../domain/article';

type Dependencies = {
  articleRepository: ArticleRepository
};

type Callbacks = {
  onSuccess: (Feed) => void,
  onError: (Error) => void
};

export default ({ articleRepository }: Dependencies) => {
  return async (user: ?User, { onSuccess, onError }: Callbacks) => {
    try {
      const userFeed = await articleRepository.fromUserFeed(user);
      onSuccess(userFeed);
    } catch(error) {
      onError(error);
    }
  };
};
