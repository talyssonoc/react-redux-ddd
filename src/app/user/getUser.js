/* @flow */
import type { User, UserRepository, WithCurrentUser } from '../../domain/user';

type Dependencies = {
  userRepository: UserRepository
};

type Options = WithCurrentUser;

type Callbacks = {
  onSuccess: (User) => void,
  onError: ($Subtype<Error>) => void
};

export default ({ userRepository }: Dependencies) => {
  return async ({ currentUser }: Options, { onSuccess, onError }: Callbacks) => {
    try {
      const user = await userRepository.getByToken({ currentUser });

      return onSuccess(user);
    } catch(error) {
      return onError(error);
    }
  };
}
