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
  currentUser: User
};

type Callbacks = {
  onSuccess: (Comment) => void,
  onError: (Error) => void
};

export default ({ commentRepository }: Dependencies) => {
  return async (commentBody: string, { articleSlug, currentUser }: Config, { onSuccess, onError }: Callbacks) => {
    try {
      const comment: NewComment = {
        body: commentBody
      };

      const globalFeed = await commentRepository.add(comment, {
        articleSlug,
        currentUser
      });

      onSuccess(globalFeed);
    } catch(error) {
      onError(error);
    }
  };
};
