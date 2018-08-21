/* @flow */
import type {
  ArticleSlug,
  Comment,
  CommentRepository
} from '../../domain/article';

import type { User } from '../../domain/user';

type Dependencies = {
  commentRepository: CommentRepository
};

type Config = {
  articleSlug: ArticleSlug,
  currentUser: User
};

type Callbacks = {
  onSuccess: () => void,
  onError: (Error) => void
};

export default ({ commentRepository }: Dependencies) => {
  return async (comment: Comment, { articleSlug, currentUser }: Config, { onSuccess, onError }: Callbacks) => {
    try {
      await commentRepository.remove(comment, {
        articleSlug,
        currentUser
      });

      onSuccess();
    } catch(error) {
      onError(error);
    }
  };
};
