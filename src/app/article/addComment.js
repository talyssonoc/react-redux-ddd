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
  onSuccess: (Comment) => void,
  onError: (Error) => void
};

export default ({ commentRepository }: Dependencies) => {
  return async (commentBody: string, { articleSlug, user }: Config, { onSuccess, onError }: Callbacks) => {
    try {
      const globalFeed = await commentRepository.addComment(commentBody, {
        articleSlug,
        user
      });

      onSuccess(globalFeed);
    } catch(error) {
      onError(error);
    }
  };
};
