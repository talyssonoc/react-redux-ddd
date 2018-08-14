/* @flow */
import * as conduitApiService from './infra/conduit/conduitApiService';
import makeUserRepository from './infra/user/userRepository';
import makeArticleRepository from './infra/article/articleRepository';
import makeCommentRepository from './infra/article/commentRepository';
import makeTagRepository from './infra/tag/tagRepository';
import makeSignInUser from './app/user/signInUser';
import makeRegisterUser from './app/user/registerUser';
import makeGetGlobalFeed from './app/article/getGlobalFeed';
import makeGetUserFeed from './app/article/getUserFeed';
import makeGetTagFeed from './app/article/getTagFeed';
import makeGetArticle from './app/article/getArticle';
import makeAddComment from './app/article/addComment';
import makeGetPopularTags from './app/tag/getPopularTags';

// Infra
const userRepository = makeUserRepository({
  conduitApiService
});

const articleRepository = makeArticleRepository({
  conduitApiService
});

const tagRepository = makeTagRepository({
  conduitApiService
});

const commentRepository = makeCommentRepository({
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

const getTagFeed = makeGetTagFeed({
  articleRepository
});

const getArticle = makeGetArticle({
  articleRepository,
  commentRepository
});

const addComment = makeAddComment({
  commentRepository
});

const getPopularTags = makeGetPopularTags({
  tagRepository
});

export {
  signInUser,
  registerUser,
  getGlobalFeed,
  getUserFeed,
  getTagFeed,
  getPopularTags,
  getArticle,
  addComment
};

