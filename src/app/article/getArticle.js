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

type Options = {
  withComments: bool
};

type SuccessResult = {
  article: Article,
  comments: ?Array<Comment>
};

type Callbacks = {
  onSuccess: (SuccessResult) => void,
  onError: (Error) => void
};

export default ({ articleRepository, commentRepository }: Dependencies) => {
  return async (slug: ArticleSlug, options: Options, { onSuccess, onError }: Callbacks) => {
    try {
      const [ article, comments ] = await Promise.all([
        articleRepository.getArticle(slug),
        options.withComments ? commentRepository.fromArticle(slug) : undefined
      ]);

      onSuccess({ article, comments });

    } catch(error) {
      onError(error);
    }
  };
};
