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

type SuccessCallback = {
  article: Article,
  comments: Array<Comment>
};

type Callbacks = {
  onSuccess: (SuccessCallback) => void,
  onError: (Object) => void
};

export default ({ articleRepository, commentRepository }: Dependencies) => {
  return async (editingArticle: EditingArticle, user: User, { onSuccess, onError }: Callbacks) => {
    try {
      const article = await articleRepository.update(editingArticle, { user });
      const comments = await commentRepository.fromArticle(article.slug);
      onSuccess({ article, comments });
    } catch(error) {
      onError(error);
    }
  };
};
