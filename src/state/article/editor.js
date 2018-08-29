/* @flow */
import type { Reducer } from 'redux';
import type { EditingArticle, ArticleSlug } from '../../domain/article';
import type { Tag } from '../../domain/tag';
import typeof * as Container from '../../container';
import type { GetState } from '../store';
import withCurrentUser from '../withCurrentUser';
import { ARTICLE, EDITOR } from '../actionTypes';

export const EditorStatuses = {
  INIT: 'INIT',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  FAILED_LOADING: 'FAILED_LOADING',
  SAVING: 'SAVING',
  SAVED: 'SAVED',
  FAILED_SAVING: 'FAILED_SAVING'
};

export type EditorStatus = $Keys<typeof EditorStatuses>;

export type EditorState = {|
  status: EditorStatus,
  article: EditingArticle,
  errors: ?Object
|};

const initialState: EditorState = {
  status: EditorStatuses.INIT,
  article: {
    title: '',
    description: '',
    body: '',
    tagList: [],
    author: null
  },
  errors: null
};

export const editorReducer: Reducer<EditorState, any> = (state = initialState, action) => {
  switch(action.type) {
    case EDITOR.UPDATE_FIELD:
      return {
        ...state,
        article: {
          ...state.article,
          [action.key]: action.value
        }
      };

    case EDITOR.ADD_TAG:
      if(state.article.tagList.includes(action.tag)) {
        return state;
      }

      return {
        ...state,
        article: {
          ...state.article,
          tagList: [
            ...state.article.tagList,
            action.tag
          ]
        }
      };

    case EDITOR.REMOVE_TAG:
      return {
        ...state,
        article: {
          ...state.article,
          tagList: state.article.tagList.filter((tag) => tag !== action.tag)
        }
      };

    case ARTICLE.CREATE_ARTICLE_REQUEST:
    case ARTICLE.EDIT_ARTICLE_REQUEST:
      return {
        ...state,
        status: EditorStatuses.SAVING
      };

    case ARTICLE.CREATE_ARTICLE_SUCCESS:
    case ARTICLE.EDIT_ARTICLE_SUCCESS:
      return {
        ...state,
        status: EditorStatuses.SAVED
      };

    case ARTICLE.CREATE_ARTICLE_ERROR:
    case ARTICLE.EDIT_ARTICLE_ERROR:
      return {
        ...state,
        status: EditorStatuses.FAILED_SAVING,
        errors: action.errors
      };

    case EDITOR.RESET:
      return initialState;

    case EDITOR.SET_EDITING_ARTICLE_REQUEST:
      return {
        ...state,
        status: EditorStatuses.LOADING
      };

    case EDITOR.SET_EDITING_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.article,
        status: EditorStatuses.LOADED
      };

    case EDITOR.SET_EDITING_ARTICLE_ERROR:
      return {
        ...state,
        errors: action.error,
        status: EditorStatuses.FAILED_LOADING
      };

    default:
      return state;
  }
};

export const resetEditor = () => ({
  type: EDITOR.RESET
});

export const updateField = (key: string, value: string) => ({
  type: EDITOR.UPDATE_FIELD,
  key,
  value
});

export const addTag = (tag: Tag) => ({
  type: EDITOR.ADD_TAG,
  tag
});

export const removeTag = (tag: Tag) => ({
  type: EDITOR.REMOVE_TAG,
  tag
});

export const setEditingArticle = (articleSlug: ArticleSlug) => {
  return (dispatch: Dispatch<any>, getState: GetState, container: Container) => {
    dispatch(setEditingArticleRequest);

    const options = {
      ...withCurrentUser(getState()),
      withComments: false
    };

    container.getArticle(articleSlug, options, {
      onSuccess: ({ article }) => dispatch(setEditingArticleSuccess(article)),
      onError: (error) => dispatch(setEditingArticleError(error))
    });
  };
};

const setEditingArticleRequest = {
  type: EDITOR.SET_EDITING_ARTICLE_REQUEST
};

const setEditingArticleSuccess = (article) => ({
  type: EDITOR.SET_EDITING_ARTICLE_SUCCESS,
  article
});

const setEditingArticleError = (error) => ({
  type: EDITOR.SET_EDITING_ARTICLE_ERROR,
  error
});
