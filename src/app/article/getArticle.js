/* @flow */
import type {
  Article,
  Comment,
  ArticleSlug,
  ArticleRepository,
  CommentRepository
} from '../../domain/article';

type Dependencies = {
  articleRepository: ArticleRepository,
  commentRepository: CommentRepository
};

type SuccessResult = {
  article: Article,
  comments: Array<Comment>
};

type Callbacks = {
  onSuccess: (SuccessResult) => void,
  onError: (Error) => void
};

export default ({ articleRepository, commentRepository }: Dependencies) => {
  return async (slug: ArticleSlug, { onSuccess, onError }: Callbacks) => {
    try {
      const [ article, comments ] = await Promise.all([
        articleRepository.getArticle(slug),
        commentRepository.fromArticle(slug)
      ]);

      onSuccess({ article, comments });

    } catch(error) {
      onError(error);
    }
  };
};
