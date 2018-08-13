/* @flow */
import type { Article, ArticleSlug, ArticleRepository } from '../../domain/article';

type Dependencies = {
  articleRepository: ArticleRepository
};

type Callbacks = {
  onSuccess: (Article) => void,
  onError: (Error) => void
};

export default ({ articleRepository }: Dependencies) => {
  return async (slug: ArticleSlug, { onSuccess, onError }: Callbacks) => {
    try {
      const article = await articleRepository.getArticle(slug);
      onSuccess(article);
    } catch(error) {
      onError(error);
    }
  };
};
