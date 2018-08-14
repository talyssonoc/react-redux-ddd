/* @flow */
import type { Dispatch, Reducer } from 'redux';
import type { User } from '../../domain/user';
import type { Article, ArticleSlug, Comment } from '../../domain/article';
import type { GetState } from '../store';
import typeof * as Container from '../../container';
import { ARTICLE } from '../actionTypes';

export type ArticleState = {
  article: ?Article,
  isLoading: bool,
  error: ?Object,
  comments: Array<Comment>
};

const initialState: ArticleState = {
  article: null,
  isLoading: false,
  error: null,
  comments: []
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
        article: action.article,
        comments: action.comments
      };

    case ARTICLE.LOAD_ARTICLE_ERROR:
      return {
        ...state,
        isLoading: false,
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

    default:
      return state;
  }
};

export const loadArticle = (slug: ArticleSlug) => {
  return (dispatch: Dispatch<any>, _: any, container: Container) => {
    dispatch(loadArticleRequest);

    container.getArticle(slug, {
      onSuccess: ({ article, comments }) => {
        dispatch(loadArticleSuccess(article, comments));
      },
      onError: (error) => dispatch(loadArticleError(error))
    });
  };
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

    const { user } = getState();

    container.addComment(commentBody, { articleSlug, user: ((user: any): User) }, {
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

    const { user } = getState();

    container.removeComment(comment, { articleSlug, user: ((user: any): User) }, {
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
