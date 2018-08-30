/* @flow */
import type { WithCurrentUser } from '../../domain/user';
import type { Article, ArticleRepository } from '../../domain/article';

type Dependencies = {
  articleRepository: ArticleRepository
};

type Options = WithCurrentUser;

type Callbacks = {
  onSuccess: (Article) => void,
  onError: (Object) => void
};

export default ({ articleRepository }: Dependencies) => {
  return async (article: Article, { currentUser }: Options, { onSuccess, onError }: Callbacks) => {
    try {
      let editedArticle;

      if(article.favorited) {
        editedArticle = await articleRepository.unsetAsFavorite(article.slug, { currentUser });
      } else {
        editedArticle = await articleRepository.setAsFavorite(article.slug, { currentUser });
      }

      onSuccess(editedArticle);
    } catch(error) {
      onError(error);
    }
  };
};
