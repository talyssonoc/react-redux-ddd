/* @flow */
import type { User, EditingUser, UserRepository } from '../../domain/user';
import type { WithCurrentUser } from '../../domain/user';

type Callbacks = {
  onSuccess: (User) => void,
  onError: ($Subtype<Error>) => void
};

type Options = WithCurrentUser;

type Dependencies = {
  userRepository: UserRepository
};

export default ({ userRepository }: Dependencies) => {
  return async (editingUser: EditingUser, { currentUser }: Options, { onSuccess, onError }: Callbacks) => {
    try {
      if(!currentUser) {
        throw new Error('User is not signed in');
      }

      const newUser = await userRepository.update(editingUser, {
        currentUser
      });

      return onSuccess(newUser);
    } catch(error) {
      return onError(error);
    }
  };
}
