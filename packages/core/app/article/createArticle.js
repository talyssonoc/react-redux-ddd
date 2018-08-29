/* @flow */
import type { WithCurrentUser } from '../../domain/user';
import type { Article, EditingArticle, ArticleRepository } from '../../domain/article';

type Dependencies = {
  articleRepository: ArticleRepository
};

type Options = WithCurrentUser;

type Callbacks = {
  onSuccess: (Article) => void,
  onError: (Object) => void
};

export default ({ articleRepository }: Dependencies) => {
  return async (editingArticle: EditingArticle, { currentUser }: Options, { onSuccess, onError }: Callbacks) => {
    try {
      const article = await articleRepository.add(editingArticle, { currentUser });
      onSuccess(article);
    } catch(error) {
      onError(error);
    }
  };
};
