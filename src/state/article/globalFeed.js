/* @flow */
import type { Dispatch, Reducer } from 'redux';
import type { FeedState } from './';
import type { Tag } from '../../domain/tag';
import typeof * as Container from '../../container';
import { FEED } from '../actionTypes';

const initialState: FeedState = {
  articles: [],
  isLoading: false,
  error: null
};

export const globalFeedReducer: Reducer<FeedState, any> = (state = initialState, action) => {
  switch(action.type) {
    case FEED.LOAD_GLOBAL_FEED_REQUEST:
    case FEED.LOAD_TAG_FEED_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case FEED.LOAD_GLOBAL_FEED_SUCCESS:
    case FEED.LOAD_TAG_FEED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        articles: action.feed.articles
      };

    case FEED.LOAD_GLOBAL_FEED_ERROR:
    case FEED.LOAD_TAG_FEED_ERROR:
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
  type: FEED.LOAD_GLOBAL_FEED_REQUEST
};

const loadGlobalFeedSuccess = (feed) => ({
  type: FEED.LOAD_GLOBAL_FEED_SUCCESS,
  feed
});

const loadGlobalFeedError = (error) => ({
  type: FEED.LOAD_GLOBAL_FEED_ERROR,
  error
});

export const loadTagFeed = (tag: Tag) => (dispatch: Dispatch<any>, _: any, container: Container) => {
  dispatch(loadTagFeedRequest);

  container.getTagFeed(tag, {
    onSuccess: (feed) => dispatch(loadTagFeedSuccess(feed)),
    onError: (error) => dispatch(loadTagFeedError(error))
  });
};

const loadTagFeedRequest = {
  type: FEED.LOAD_TAG_FEED_REQUEST
};

const loadTagFeedSuccess = (feed) => ({
  type: FEED.LOAD_TAG_FEED_SUCCESS,
  feed
});

const loadTagFeedError = (error) => ({
  type: FEED.LOAD_TAG_FEED_ERROR,
  error
});
