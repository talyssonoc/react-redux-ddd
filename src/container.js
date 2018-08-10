/* @flow */
import * as conduitApiService from './infra/conduit/conduitApiService';
import makeUserRepository from './infra/user/userRepository';
import makeArticleRepository from './infra/article/articleRepository';
import makeSignInUser from './app/user/signInUser';
import makeRegisterUser from './app/user/registerUser';
import makeGetGlobalFeed from './app/article/getGlobalFeed';
import makeGetUserFeed from './app/article/getUserFeed';

// Infra
const userRepository = makeUserRepository({
  conduitApiService
});

const articleRepository = makeArticleRepository({
  conduitApiService
});

//App
const signInUser = makeSignInUser({
  userRepository
});

const registerUser = makeRegisterUser({
  userRepository
});

const getGlobalFeed = makeGetGlobalFeed({
  articleRepository
});

const getUserFeed = makeGetUserFeed({
  articleRepository
});

export {
  signInUser,
  registerUser,
  getGlobalFeed,
  getUserFeed
};

