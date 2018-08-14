/* @flow */
import type { Dispatch, Reducer } from 'redux';
import type { EditingArticle } from '../../domain/article';
import type { Tag } from '../../domain/tag';
import { EDITOR } from '../actionTypes';

export type EditorState = {
  article: EditingArticle,
  isLoading: bool
};

const initialState: EditorState = {
  article: {
    title: '',
    description: '',
    body: '',
    tagList: []
  },
  isLoading: false
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

    case EDITOR.RESET:
      return initialState;

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
