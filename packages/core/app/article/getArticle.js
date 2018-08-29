/* @flow */
import type {
  Article,
  Comment,
  ArticleSlug,
  ArticleRepository,
  CommentRepository
} from '../../domain/article';
import type { WithCurrentUser } from '../../domain/user';

type Dependencies = {
  articleRepository: ArticleRepository,
  commentRepository: CommentRepository
};

type Options = WithCurrentUser & {
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
    const { withComments, currentUser } = options;

    try {
      const [ article, comments ] = await Promise.all([
        articleRepository.getArticle(slug, { currentUser }),
        withComments ? commentRepository.fromArticle(slug) : undefined
      ]);

      onSuccess({ article, comments });

    } catch(error) {
      onError(error);
    }
  };
};
