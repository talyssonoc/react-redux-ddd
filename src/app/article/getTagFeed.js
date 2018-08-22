/* @flow */
import type { WithCurrentUser } from '../../domain/user';
import type { Feed, ArticleRepository } from '../../domain/article';
import type { Tag } from '../../domain/tag';

type Dependencies = {
  articleRepository: ArticleRepository
};

type Options = WithCurrentUser;

type Callbacks = {
  onSuccess: (Feed) => void,
  onError: (Error) => void
};

export default ({ articleRepository }: Dependencies) => {
  return async (tag: Tag, { currentUser }: Options, { onSuccess, onError }: Callbacks) => {
    try {
      const globalFeed = await articleRepository.fromTagFeed(tag, { currentUser });
      onSuccess(globalFeed);
    } catch(error) {
      onError(error);
    }
  };
};
