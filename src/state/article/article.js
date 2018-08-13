/* @flow */
import type { Dispatch, Reducer } from 'redux';
import type { Article, ArticleSlug, Comment } from '../../domain/article';
import typeof * as Container from '../../container';
import { ARTICLE } from '../actionTypes';

export type ArticleState = {
  article: ?Article,
  isLoading: bool,
  error: ?Object,
  comments: Array<Comment>,
  isLoadingComments: bool,
  errorComments: ?Object
};

const initialState: ArticleState = {
  article: null,
  isLoading: false,
  error: null,
  comments: [],
  isLoadingComments: false,
  errorComments: null
};

export const articleReducer: Reducer<ArticleState, any> = (state = initialState, action) => {
  switch(action.type) {
    case ARTICLE.LOAD_ARTICLE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case ARTICLE.LOAD_ARTICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        article: action.article
      };

    case ARTICLE.LOAD_ARTICLE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case ARTICLE.LOAD_COMMENTS_REQUEST:
      return {
        ...state,
        isLoadingComments: true,
        errorComments: null
      };

    case ARTICLE.LOAD_COMMENTS_SUCCESS:
      return {
        ...state,
        isLoadingComments: false,
        comments: action.comments
      };

    case ARTICLE.LOAD_COMMENTS_ERROR:
      return {
        ...state,
        isLoadingComments: false,
        errorComments: action.error
      };

    default:
      return state;
  }
};

export const loadArticle = (slug: ArticleSlug) => {
  return (dispatch: Dispatch<any>, _: any, container: Container) => {
    dispatch(loadArticleRequest);

    container.getArticle(slug, {
      onSuccess: (article) => dispatch(loadArticleSuccess(article)),
      onError: (error) => dispatch(loadArticleError(error))
    });
  };
};

const loadArticleRequest = {
  type: ARTICLE.LOAD_ARTICLE_REQUEST
};

const loadArticleSuccess = (article) => ({
  type: ARTICLE.LOAD_ARTICLE_SUCCESS,
  article
});

const loadArticleError = (error) => ({
  type: ARTICLE.LOAD_ARTICLE_ERROR,
  error
});

export const loadComments = (slug: ArticleSlug) => {
  return (dispatch: Dispatch<any>, _: any, container: Container) => {
    dispatch(loadCommentsRequest);

    container.getComments(slug, {
      onSuccess: (comments) => dispatch(loadCommentsSuccess(comments)),
      onError: (error) => dispatch(loadCommentsError(error))
    });
  };
};

const loadCommentsRequest = {
  type: ARTICLE.LOAD_COMMENTS_REQUEST
};

const loadCommentsSuccess = (comments) => ({
  type: ARTICLE.LOAD_COMMENTS_SUCCESS,
  comments
});

const loadCommentsError = (error) => ({
  type: ARTICLE.LOACOMMENTSLE_ERROR,
  error
});
