/* @flow */
import type { User } from '../../domain/user';
import type { Article, EditingArticle, ArticleRepository } from '../../domain/article';

type Dependencies = {
  articleRepository: ArticleRepository
};

type Options = {
  currentUser: User
};

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
