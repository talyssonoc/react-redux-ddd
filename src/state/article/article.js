/* @flow */
import type { Dispatch, Reducer } from 'redux';
import type { Article, ArticleSlug } from '../../domain/article';
import typeof * as Container from '../../container';
import { ARTICLE } from '../actionTypes';

export type ArticleState = {
  article: ?Article,
  isLoading: bool,
  error: ?Object
};

const initialState: ArticleState = {
  article: null,
  isLoading: false,
  error: null
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

    default:
      return state;
  }
};

export const loadArticle = (slug: ArticleSlug) => (dispatch: Dispatch<any>, _: any, container: Container) => {
  dispatch(loadArticleRequest);

  container.getArticle(slug, {
    onSuccess: (article) => dispatch(loadArticleSuccess(article)),
    onError: (error) => dispatch(loadArticleError(error))
  });
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
