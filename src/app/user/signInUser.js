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
  return async (userAuthInfo: UserAuthInfo, { onSuccess, onError }: Callbacks) => {
    try {
      const authorizedUser = await userRepository.fromAuthInfo(userAuthInfo);

      return onSuccess(authorizedUser);
    } catch(error) {
      return onError(error);
    }
  };
}
