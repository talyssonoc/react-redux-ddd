/* @flow */
import type { Dispatch, Reducer } from 'redux';
import type { FeedState } from './';
import typeof * as Container from '../../container';
import { ARTICLE } from '../actionTypes';

const initialState: FeedState = {
  articles: [],
  isLoading: false,
  error: null
};

export const globalFeedReducer: Reducer<FeedState, any> = (state = initialState, action) => {
  switch(action.type) {
    case ARTICLE.LOAD_GLOBAL_FEED_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case ARTICLE.LOAD_GLOBAL_FEED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        articles: action.feed.articles
      };

    case ARTICLE.LOAD_GLOBAL_FEED_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export const loadGlobalFeed = () => (dispatch: Dispatch<any>, _: any, container: Container) => {
  dispatch(loadGlobalFeedRequest);

  container.getGlobalFeed({
    onSuccess: (feed) => dispatch(loadGlobalFeedSuccess(feed)),
    onError: (error) => dispatch(loadGlobalFeedError(error))
  });
};

const loadGlobalFeedRequest = {
  type: ARTICLE.LOAD_GLOBAL_FEED_REQUEST
};

const loadGlobalFeedSuccess = (feed) => ({
  type: ARTICLE.LOAD_GLOBAL_FEED_SUCCESS,
  feed
});

const loadGlobalFeedError = (error) => ({
  type: ARTICLE.LOAD_GLOBAL_FEED_ERROR,
  error
});
