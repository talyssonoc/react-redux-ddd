/* @flow */
import * as conduitApiService from './infra/conduit/conduitApiService';
import makeUserRepository from './infra/user/userRepository';
import makeArticleRepository from './infra/article/articleRepository';
import makeCommentRepository from './infra/article/commentRepository';
import makeTagRepository from './infra/tag/tagRepository';
import makeAuthorRepository from './infra/author/authorRepository';
import makeSignInUser from './app/user/signInUser';
import makeRegisterUser from './app/user/registerUser';
import makeGetUser from './app/user/getUser';
import makeChangeSettings from './app/user/changeSettings';
import makeGetGlobalFeed from './app/article/getGlobalFeed';
import makeGetUserFeed from './app/article/getUserFeed';
import makeGetTagFeed from './app/article/getTagFeed';
import makeGetAuthorFeed from './app/article/getAuthorFeed';
import makeGetAuthorFavoritesFeed from './app/article/getAuthorFavoritesFeed';
import makeGetArticle from './app/article/getArticle';
import makeAddComment from './app/article/addComment';
import makeRemoveComment from './app/article/removeComment';
import makeCreateArticle from './app/article/createArticle';
import makeEditArticle from './app/article/editArticle';
import makeRemoveArticle from './app/article/removeArticle';
import makeToggleArticleFavoriteStatus from './app/article/toggleArticleFavoriteStatus';
import makeGetPopularTags from './app/tag/getPopularTags';
import makeGetAuthor from './app/author/getAuthor';
import makeToggleAuthorFollowStatus from './app/author/toggleAuthorFollowStatus';

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

const authorRepository = makeAuthorRepository({
  conduitApiService
});

//App
const signInUser = makeSignInUser({
  userRepository
});

const registerUser = makeRegisterUser({
  userRepository
});

const getUser = makeGetUser({
  userRepository
});

const changeSettings = makeChangeSettings({
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

const getAuthorFeed = makeGetAuthorFeed({
  articleRepository
});

const getAuthorFavoritesFeed = makeGetAuthorFavoritesFeed({
  articleRepository
});

const getArticle = makeGetArticle({
  articleRepository,
  commentRepository
});

const addComment = makeAddComment({
  commentRepository
});

const removeComment = makeRemoveComment({
  commentRepository
});

const createArticle = makeCreateArticle({
  articleRepository
});

const editArticle = makeEditArticle({
  articleRepository,
  commentRepository
});

const removeArticle = makeRemoveArticle({
  articleRepository
});

const toggleArticleFavoriteStatus = makeToggleArticleFavoriteStatus({
  articleRepository
});

const getPopularTags = makeGetPopularTags({
  tagRepository
});

const getAuthor = makeGetAuthor({
  authorRepository
});

const toggleAuthorFollowStatus = makeToggleAuthorFollowStatus({
  authorRepository
});

export {
  signInUser,
  registerUser,
  getGlobalFeed,
  getUserFeed,
  getTagFeed,
  getAuthorFeed,
  getAuthorFavoritesFeed,
  getPopularTags,
  getArticle,
  addComment,
  removeComment,
  createArticle,
  editArticle,
  getAuthor,
  toggleArticleFavoriteStatus,
  toggleAuthorFollowStatus,
  changeSettings,
  getUser,
  removeArticle
};
