/* @flow */
import type { ArticleSlug, Comment, CommentRepository } from '../../domain/article';

type Dependencies = {
  commentRepository: CommentRepository
};

type Callbacks = {
  onSuccess: (Array<Comment>) => void,
  onError: (Error) => void
};

export default ({ commentRepository }: Dependencies) => {
  return async (slug: ArticleSlug, { onSuccess, onError }: Callbacks) => {
    try {
      const comments = await commentRepository.fromArticle(slug);
      onSuccess(comments);
    } catch(error) {
      onError(error);
    }
  };
};
