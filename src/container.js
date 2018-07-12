import * as conduitApiService from './infra/conduit/conduitApiService';
import makeUserRepository from './infra/user/userRepository';
import makeSignInUser from './app/user/signInUser';

// Infra
const userRepository = makeUserRepository({
  conduitApiService
});

//App
const signInUser = makeSignInUser({
  userRepository
});

export {
  signInUser
};
