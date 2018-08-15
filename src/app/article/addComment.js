/* @flow */
import type {
  ArticleSlug,
  Comment,
  NewComment,
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
      const comment: NewComment = {
        body: commentBody
      };

      const globalFeed = await commentRepository.add(comment, {
        articleSlug,
        user
      });

      onSuccess(globalFeed);
    } catch(error) {
      onError(error);
    }
  };
};
