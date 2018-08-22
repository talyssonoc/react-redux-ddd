/* @flow */
import type { Dispatch, Reducer } from 'redux';
import type { User } from '../../domain/user';
import type { Article, ArticleSlug, Comment, EditingArticle } from '../../domain/article';
import typeof * as Container from '../../container';
import type { GetState } from '../store';
import withCurrentUser from '../withCurrentUser';
import { ARTICLE } from '../actionTypes';

export type ArticleState = {|
  article: ?Article,
  isLoading: bool,
  error: ?Object,
  comments: Array<Comment>
|};

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
    case ARTICLE.CREATE_ARTICLE_SUCCESS:
    case ARTICLE.EDIT_ARTICLE_SUCCESS:
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
