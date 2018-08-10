/* @flow */
import type { Dispatch, Reducer } from 'redux';
import typeof * as Container from '../../container';
import type { User } from '../../domain/user';
import type { Article, Feed } from '../../domain/article';
import type { GetState } from '../store';
import { ARTICLE } from '../actionTypes';

export type UserFeedState = {|
  articles: Array<Article>,
  isLoading: bool,
  error: ?Object
|};

const initialState: UserFeedState = {
  articles: [],
  isLoading: false,
  error: null
};

export const userFeedReducer: Reducer<UserFeedState, any> = (state = initialState, action) => {
  switch(action.type) {
    case ARTICLE.LOAD_USER_FEED_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case ARTICLE.LOAD_USER_FEED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        articles: action.feed.articles
      };

    case ARTICLE.LOAD_USER_FEED_ERROR:
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
  type: ARTICLE.LOAD_USER_FEED_REQUEST
};

const loadUserFeedSuccess = (feed) => ({
  type: ARTICLE.LOAD_USER_FEED_SUCCESS,
  feed
});

const loadUserFeedError = (error) => ({
  type: ARTICLE.LOAD_USER_FEED_ERROR,
  error
});
