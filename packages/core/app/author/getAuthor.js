/* @flow */
import type { Author, AuthorRepository } from '../../domain/author';
import type { WithCurrentUser } from '../../domain/user';

type Dependencies = {
  authorRepository: AuthorRepository
};

type Options = WithCurrentUser;

type Callbacks = {
  onSuccess: (Author) => void,
  onError: (Error) => void
};

export default ({ authorRepository }: Dependencies) => {
  return async (authorUsername: string, { currentUser }: Options, { onSuccess, onError }: Callbacks) => {
    try {
      const author = await authorRepository.getByUsername(authorUsername, {
        currentUser
      });

      onSuccess(author);
    } catch(error) {
      onError(error);
    }
  };
};
