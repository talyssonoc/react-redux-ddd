/* @flow */
import type { Dispatch, Reducer } from 'redux';
import typeof * as Container from '@rw-ddd/core/container';
import type { Tag } from '@rw-ddd/core/domain/tag';
import { TAG } from '../actionTypes';

export type PopularTagsState = {|
  tags: Array<Tag>,
  error: any,
  isLoading: bool
|};

const initialState: PopularTagsState = {
  tags: [],
  error: null,
  isLoading: false
};

export const popularTagsReducer: Reducer<PopularTagsState, any> = (state = initialState, action) => {
  switch(action.type) {
    case TAG.LOAD_POPULAR_TAGS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case TAG.LOAD_POPULAR_TAGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tags: action.tags
      };

    case TAG.LOAD_POPULAR_TAGS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export const loadPopularTags = () => {
  return (dispatch: Dispatch<any>, _: any, container: Container) => {
    dispatch(loadPopularTagsRequest);

    container.getPopularTags({
      onSuccess: (tags) => dispatch(loadPopularTagsSuccess(tags)),
      onError: (error) => dispatch(loadPopularTagsError(error))
    });
  };
};

const loadPopularTagsRequest = {
  type: TAG.LOAD_POPULAR_TAGS_REQUEST
};

const loadPopularTagsSuccess = (tags) => ({
  type: TAG.LOAD_POPULAR_TAGS_SUCCESS,
  tags
});

const loadPopularTagsError = (error) => ({
  type: TAG.LOAD_POPULAR_TAGS_ERROR,
  error
});
