/* @flow */
import type { User } from '../../domain/user';
import type { Article, EditingArticle, ArticleRepository } from '../../domain/article';

type Dependencies = {
  articleRepository: ArticleRepository
};

type Callbacks = {
  onSuccess: (Article) => void,
  onError: (Object) => void
};

export default ({ articleRepository }: Dependencies) => {
  return async (editingArticle: EditingArticle, user: User, { onSuccess, onError }: Callbacks) => {
    try {
      const article = await articleRepository.add(editingArticle, { user });
      onSuccess(article);
    } catch(error) {
      onError(error);
    }
  };
};
