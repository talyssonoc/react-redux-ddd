/* @flow */
import type { Dispatch, Reducer } from 'redux';
import type { FeedState } from './';
import typeof * as Container from '../../container';
import type { User } from '../../domain/user';
import type { GetState } from '../store';
import { FEED } from '../actionTypes';

const initialState: FeedState = {
  articles: [],
  isLoading: false,
  error: null
};

export const userFeedReducer: Reducer<FeedState, any> = (state = initialState, action) => {
  switch(action.type) {
    case FEED.LOAD_USER_FEED_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case FEED.LOAD_USER_FEED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        articles: action.feed.articles
      };

    case FEED.LOAD_USER_FEED_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export const loadUserFeed = () => (dispatch: Dispatch<any>, getState: GetState, container: Container) => {
  dispatch(loadUserFeedRequest);

  const { user } = getState();

  container.getUserFeed(((user: any): User), {
    onSuccess: (feed) => dispatch(loadUserFeedSuccess(feed)),
    onError: (error) => dispatch(loadUserFeedError(error))
  });
};

const loadUserFeedRequest = {
  type: FEED.LOAD_USER_FEED_REQUEST
};

const loadUserFeedSuccess = (feed) => ({
  type: FEED.LOAD_USER_FEED_SUCCESS,
  feed
});

const loadUserFeedError = (error) => ({
  type: FEED.LOAD_USER_FEED_ERROR,
  error
});
