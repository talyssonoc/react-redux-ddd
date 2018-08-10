/* @flow */
import type { User, UserAuthInfo, UserRepository } from '../../domain/user';

type Callbacks = {
  onSuccess: (User) => void,
  onError: ($Subtype<Error>) => void
};

type Dependencies = {
  userRepository: UserRepository
};

export default ({ userRepository }: Dependencies) => {
  return async (userInfo: UserAuthInfo, { onSuccess, onError }: Callbacks) => {
    try {
      const newUser = await userRepository.add(userInfo);

      return onSuccess(newUser);
    } catch(error) {
      return onError(error);
    }
  };
}
