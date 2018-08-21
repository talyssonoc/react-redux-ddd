/* @flow */
import type { Author, AuthorRepository } from '../../domain/author';
import type { User } from '../../domain/user';

type Dependencies = {
  authorRepository: AuthorRepository
};

type Options = {
  currentUser: ?User
};

type Callbacks = {
  onSuccess: (Author) => void,
  onError: (Error) => void
};

export default ({ authorRepository }: Dependencies) => {
  return async (authorUsername: string, options: Options, { onSuccess, onError }: Callbacks) => {
    try {
      const author = await authorRepository.getByUsername(authorUsername, {
        currentUser: options.currentUser
      });

      onSuccess(author);
    } catch(error) {
      onError(error);
    }
  };
};
