/* @flow */
import type {
  ArticleSlug,
  Comment,
  CommentRepository
} from '../../domain/article';

import type { WithCurrentUser } from '../../domain/user';

type Dependencies = {
  commentRepository: CommentRepository
};

type Config = WithCurrentUser & {
  articleSlug: ArticleSlug
};

type Callbacks = {
  onSuccess: (Comment) => void,
  onError: (Error) => void
};

export default ({ commentRepository }: Dependencies) => {
  return async (commentBody: string, { articleSlug, currentUser }: Config, { onSuccess, onError }: Callbacks) => {
    try {
      const comment = {
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
