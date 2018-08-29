/* @flow */
import type { WithCurrentUser } from '../../domain/user';
import type { Article, ArticleRepository } from '../../domain/article';

type Dependencies = {
  articleRepository: ArticleRepository
};

type Options = WithCurrentUser;

type Callbacks = {
  onSuccess: () => void,
  onError: (Object) => void
};

export default ({ articleRepository }: Dependencies) => {
  return async (article: Article, { currentUser }: Options, { onSuccess, onError }: Callbacks) => {
    try {
      await articleRepository.remove(article, { currentUser });
      onSuccess();
    } catch(error) {
      onError(error);
    }
  };
};
