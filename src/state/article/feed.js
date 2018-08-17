/* @flow */
import type { Dispatch, Reducer } from 'redux';
import type { User } from '../../domain/user';
import type { Article } from '../../domain/article';
import type { Tag } from '../../domain/tag';
import type { GetState } from '../store';
import typeof * as Container from '../../container';
import { FEED } from '../actionTypes';

export type FeedState = {|
  articles: Array<Article>,
  isLoading: bool,
  error: ?Error
|};

const initialState: FeedState = {
  articles: [],
  isLoading: false,
  error: null
};

export const feedReducer: Reducer<FeedState, any> = (state = initialState, action) => {
  switch(action.type) {
    case FEED.LOAD_GLOBAL_FEED_REQUEST:
    case FEED.LOAD_USER_FEED_REQUEST:
    case FEED.LOAD_TAG_FEED_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case FEED.LOAD_FEED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        articles: action.feed.articles
      };

    case FEED.LOAD_FEED_ERROR:
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
    onSuccess: (feed) => dispatch(loadFeedSuccess(feed)),
    onError: (error) => dispatch(loadFeedError(error))
  });
};

const loadGlobalFeedRequest = {
  type: FEED.LOAD_GLOBAL_FEED_REQUEST
};


export const loadUserFeed = () => (dispatch: Dispatch<any>, getState: GetState, container: Container) => {
  dispatch(loadUserFeedRequest);

  const { user } = getState();

  container.getUserFeed(((user: any): User), {
    onSuccess: (feed) => dispatch(loadFeedSuccess(feed)),
    onError: (error) => dispatch(loadFeedError(error))
  });
};

const loadUserFeedRequest = {
  type: FEED.LOAD_USER_FEED_REQUEST
};

export const loadTagFeed = (tag: Tag) => (dispatch: Dispatch<any>, _: any, container: Container) => {
  dispatch(loadTagFeedRequest);

  container.getTagFeed(tag, {
    onSuccess: (feed) => dispatch(loadFeedSuccess(feed)),
    onError: (error) => dispatch(loadFeedError(error))
  });
};

const loadTagFeedRequest = {
  type: FEED.LOAD_TAG_FEED_REQUEST
};

const loadFeedSuccess = (feed) => ({
  type: FEED.LOAD_FEED_SUCCESS,
  feed
});

const loadFeedError = (error) => ({
  type: FEED.LOAD_FEED_ERROR,
  error
});
