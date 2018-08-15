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
  user: User
};

type Callbacks = {
  onSuccess: () => void,
  onError: (Error) => void
};

export default ({ commentRepository }: Dependencies) => {
  return async (comment: Comment, { articleSlug, user }: Config, { onSuccess, onError }: Callbacks) => {
    try {
      await commentRepository.remove(comment, {
        articleSlug,
        user
      });

      onSuccess();
    } catch(error) {
      onError(error);
    }
  };
};
