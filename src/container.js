import * as conduitApiService from './infra/conduit/conduitApiService';
import makeUserRepository from './infra/user/userRepository';
import makeSignInUser from './app/user/signInUser';
import makeRegisterUser from './app/user/registerUser';

// Infra
const userRepository = makeUserRepository({
  conduitApiService
});

//App
const signInUser = makeSignInUser({
  userRepository
});

const registerUser = makeRegisterUser({
  userRepository
});

export {
  signInUser,
  registerUser
};
