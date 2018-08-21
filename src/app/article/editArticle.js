/* @flow */
import type { User } from '../../domain/user';
import type {
  Article, Comment, EditingArticle,
  ArticleRepository, CommentRepository
} from '../../domain/article';

type Dependencies = {
  articleRepository: ArticleRepository,
  commentRepository: CommentRepository
};

type Options = {
  currentUser: User
};

type SuccessCallback = {
  article: Article,
  comments: Array<Comment>
};

type Callbacks = {
  onSuccess: (SuccessCallback) => void,
  onError: (Object) => void
};

export default ({ articleRepository, commentRepository }: Dependencies) => {
  return async (editingArticle: EditingArticle, { currentUser }: Options, { onSuccess, onError }: Callbacks) => {
    try {
      const article = await articleRepository.update(editingArticle, { currentUser });
      const comments = await commentRepository.fromArticle(article.slug);
      onSuccess({ article, comments });
    } catch(error) {
      onError(error);
    }
  };
};
