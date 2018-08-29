/* @flow */
import type { Dispatch, Reducer } from 'redux';
import {
  updateArticle,
  type Article,
  type ArticleSlug,
  type Comment,
  type EditingArticle
} from '@rw-ddd/core/domain/article';
import { updateAuthor } from '@rw-ddd/core/domain/author';
import typeof * as Container from '@rw-ddd/core/container';
import type { GetState } from '../store';
import withCurrentUser from '../withCurrentUser';
import { ARTICLE, AUTHOR } from '../actionTypes';

export const ArticleStatuses = {
  INIT: 'INIT',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  FAILED_LOADING: 'FAILED_LOADING',
  REMOVING: 'REMOVING',
  REMOVED: 'REMOVED'
};

export type ArticleStatus = $Keys<typeof ArticleStatuses>;

export type ArticleState = {|
  article: ?Article,
  status: ArticleStatus,
  error: ?Object,
  comments: Array<Comment>,
  favoritingArticle: ?Article
|};

const initialState: ArticleState = {
  article: null,
  status: ArticleStatuses.INIT,
  error: null,
  comments: [],
  favoritingArticle: null
};

export const articleReducer: Reducer<ArticleState, any> = (state = initialState, action) => {
  switch(action.type) {
    case ARTICLE.LOAD_ARTICLE_REQUEST:
      return {
        ...state,
        status: ArticleStatuses.LOADING,
        error: null
      };

    case ARTICLE.LOAD_ARTICLE_SUCCESS:
    case ARTICLE.CREATE_ARTICLE_SUCCESS:
    case ARTICLE.EDIT_ARTICLE_SUCCESS:
      return {
        ...state,
        status: ArticleStatuses.LOADED,
        article: action.article,
        comments: action.comments
      };

    case ARTICLE.LOAD_ARTICLE_ERROR:
      return {
        ...state,
        status: ArticleStatuses.FAILED_LOADING,
        error: action.error
      };

    case ARTICLE.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [
          action.comment,
          ...state.comments
        ]
      };

    case ARTICLE.REMOVE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== action.comment.id)
      };

    case ARTICLE.TOGGLE_ARTICLE_FAVORITE_STATUS_REQUEST:
      return {
        ...state,
        favoritingArticle: action.article
      };

    case ARTICLE.TOGGLE_ARTICLE_FAVORITE_STATUS_SUCCESS:
      return {
        ...state,
        favoritingArticle: null,
        article: updateArticle(state.article, action.article)
      };

    case AUTHOR.TOGGLE_AUTHOR_FOLLOW_STATUS_SUCCESS:
      return {
        ...state,
        article: updateAuthor(state.article, action.author)
      };

    case ARTICLE.REMOVE_ARTICLE_REQUEST:
      return {
        ...state,
        status: ArticleStatuses.REMOVING
      };

    case ARTICLE.REMOVE_ARTICLE_SUCCESS:
      return {
        ...state,
        status: ArticleStatuses.REMOVED
      };

    case ARTICLE.REMOVE_ARTICLE_ERROR:
      return {
        ...state,
        status: ArticleStatuses.LOADED
      };

    case ARTICLE.UNLOAD_ARTICLE:
      return initialState;

    default:
      return state;
  }
};

export const loadArticle = (slug: ArticleSlug) => {
  return (dispatch: Dispatch<any>, getState: GetState, container: Container) => {
    const state = getState();

    if(!shouldLoadArticle(state, slug)) {
      return;
    }

    const options = {
      ...withCurrentUser(state),
      withComments: true
    };

    dispatch(loadArticleRequest);

    return container.getArticle(slug, options, {
      onSuccess: ({ article, comments }) => dispatch(loadArticleSuccess(article, comments)),
      onError: (error) => dispatch(loadArticleError(error))
    });
  };
};

const shouldLoadArticle = (state, slug) => {
  const { article } = state;

  return !article.article || !(article.article.slug === slug);
};

const loadArticleRequest = {
  type: ARTICLE.LOAD_ARTICLE_REQUEST
};

const loadArticleSuccess = (article, comments) => ({
  type: ARTICLE.LOAD_ARTICLE_SUCCESS,
  article,
  comments
});

const loadArticleError = (error) => ({
  type: ARTICLE.LOAD_ARTICLE_ERROR,
  error
});

export const addComment = (commentBody: string, articleSlug: ArticleSlug) => {
  return (dispatch: Dispatch<any>, getState: GetState, container: Container) => {
    dispatch(addCommentRequest);

    const options = {
      ...withCurrentUser(getState()),
      articleSlug
    };

    container.addComment(commentBody, options, {
      onSuccess: (comment) => dispatch(addCommentSuccess(comment)),
      onError: (error) => dispatch(addCommentError(error))
    });
  };
};

const addCommentRequest = {
  type: ARTICLE.ADD_COMMENT_REQUEST
};

const addCommentSuccess = (comment) => ({
  type: ARTICLE.ADD_COMMENT_SUCCESS,
  comment
});

const addCommentError = (error) => ({
  type: ARTICLE.ADD_COMMENT_ERROR,
  error
});

export const removeComment = (comment: Comment, articleSlug: ArticleSlug) => {
  return (dispatch: Dispatch<any>, getState: GetState, container: Container) => {
    dispatch(removeCommentRequest);

    const options = {
      ...withCurrentUser(getState()),
      articleSlug
    };

    container.removeComment(comment, options, {
      onSuccess: () => dispatch(removeCommentSuccess(comment)),
      onError: (error) => dispatch(removeCommentError(error))
    });
  };
};

const removeCommentRequest = {
  type: ARTICLE.REMOVE_COMMENT_REQUEST
};

const removeCommentSuccess = (comment) => ({
  type: ARTICLE.REMOVE_COMMENT_SUCCESS,
  comment
});

const removeCommentError = (error) => ({
  type: ARTICLE.REMOVE_COMMENT_ERROR,
  error
});

export const unloadArticle = () => ({
  type: ARTICLE.UNLOAD_ARTICLE
});

export const createArticle = (editingArticle: EditingArticle) => {
  return (dispatch: Dispatch<any>, getState: GetState, container: Container) => {
    dispatch(createArticleRequest);

    const options = withCurrentUser(getState());

    container.createArticle(editingArticle, options, {
      onSuccess: (article: Article) => dispatch(createArticleSuccess(article)),
      onError: (error) => dispatch(createArticleError(error.errors))
    });
  };
};

const createArticleRequest = {
  type: ARTICLE.CREATE_ARTICLE_REQUEST
};

const createArticleSuccess = (article) => ({
  type: ARTICLE.CREATE_ARTICLE_SUCCESS,
  article,
  comments: []
});

const createArticleError = (errors) => ({
  type: ARTICLE.CREATE_ARTICLE_ERROR,
  errors
});

export const editArticle = (editingArticle: EditingArticle) => {
  return (dispatch: Dispatch<any>, getState: GetState, container: Container) => {
    dispatch(editArticleRequest);

    const options = withCurrentUser(getState());

    container.editArticle(editingArticle, options, {
      onSuccess: ({ article, comments }) => dispatch(editArticleSuccess(article, comments)),
      onError: (error) => dispatch(editArticleError(error.errors))
    });
  };
};

const editArticleRequest = {
  type: ARTICLE.EDIT_ARTICLE_REQUEST
};

const editArticleSuccess = (article, comments) => ({
  type: ARTICLE.EDIT_ARTICLE_SUCCESS,
  article,
  comments
});

const editArticleError = (errors) => ({
  type: ARTICLE.EDIT_ARTICLE_ERROR,
  errors
});

export const toggleArticleFavoriteStatus = (article: Article) => {
  return (dispatch: Dispatch<any>, getState: GetState, container: Container) => {
    dispatch(toggleArticleFavoriteStatusRequest(article));

    const options = withCurrentUser(getState());

    container.toggleArticleFavoriteStatus(article, options, {
      onSuccess: (article) => dispatch(toggleArticleFavoriteStatusSuccess(article)),
      onError: (error) => dispatch(toggleArticleFavoriteStatusError(error.errors))
    });
  };
};

const toggleArticleFavoriteStatusRequest = (article) => ({
  type: ARTICLE.TOGGLE_ARTICLE_FAVORITE_STATUS_REQUEST,
  article
});

const toggleArticleFavoriteStatusSuccess = (article) => ({
  type: ARTICLE.TOGGLE_ARTICLE_FAVORITE_STATUS_SUCCESS,
  article
});

const toggleArticleFavoriteStatusError = (errors) => ({
  type: ARTICLE.TOGGLE_ARTICLE_FAVORITE_STATUS_ERROR,
  errors
});

export const removeArticle = (article: Article) => {
  return (dispatch: Dispatch<any>, getState: GetState, container: Container) => {
    dispatch(removeArticleRequest);

    const options = withCurrentUser(getState());

    container.removeArticle(article, options, {
      onSuccess: (article) => dispatch(removeArticleSuccess),
      onError: (error) => dispatch(removeArticleError(error.errors))
    });
  };
};

const removeArticleRequest = {
  type: ARTICLE.REMOVE_ARTICLE_REQUEST
};

const removeArticleSuccess = {
  type: ARTICLE.REMOVE_ARTICLE_SUCCESS,
};

const removeArticleError = (errors) => ({
  type: ARTICLE.REMOVE_ARTICLE_ERROR,
  errors
});
