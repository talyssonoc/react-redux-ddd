/* @flow */
import type { WithCurrentUser } from '../../domain/user';
import type { Author, AuthorRepository } from '../../domain/author';

type Dependencies = {
  authorRepository: AuthorRepository
};

type Options = WithCurrentUser;

type Callbacks = {
  onSuccess: (Author) => void,
  onError: (Object) => void
};

export default ({ authorRepository }: Dependencies) => {
  return async (author: Author, { currentUser }: Options, { onSuccess, onError }: Callbacks) => {
    try {
      let editedAuthor;

      if(author.following) {
        editedAuthor = await authorRepository.unsetAsFollowing(author.username, { currentUser });
      } else {
        editedAuthor = await authorRepository.setAsFollowing(author.username, { currentUser });
      }

      onSuccess(editedAuthor);
    } catch(error) {
      onError(error);
    }
  };
};
