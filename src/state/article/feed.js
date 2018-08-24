/* @flow */
import type { Dispatch, Reducer } from 'redux';
import { updateArticle, type Article } from '../../domain/article';
import type { Tag } from '../../domain/tag';
import typeof * as Container from '../../container';
import type { GetState } from '../store';
import withCurrentUser from '../withCurrentUser';
import { FEED, ARTICLE } from '../actionTypes';

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
    case FEED.LOAD_AUTHOR_FEED_REQUEST:
    case FEED.LOAD_AUTHOR_FAVORITES_FEED_REQUEST:
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

    case ARTICLE.TOGGLE_ARTICLE_FAVORITE_STATUS_SUCCESS:
      return {
        ...state,
        articles: state.articles.map((article) =>
          ((updateArticle(article, action.article): any): Article)
        )
      };

    default:
      return state;
  }
};

export const loadGlobalFeed = () => (dispatch: Dispatch<any>, getState: GetState, container: Container) => {
  dispatch(loadGlobalFeedRequest);

  const options = withCurrentUser(getState());

  container.getGlobalFeed(options, {
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

  container.getUserFeed(user, {
    onSuccess: (feed) => dispatch(loadFeedSuccess(feed)),
    onError: (error) => dispatch(loadFeedError(error))
  });
};

const loadUserFeedRequest = {
  type: FEED.LOAD_USER_FEED_REQUEST
};

export const loadTagFeed = (tag: Tag) => {
  return (dispatch: Dispatch<any>, getState: GetState, container: Container) => {
    dispatch(loadTagFeedRequest);

    const options = withCurrentUser(getState());

    container.getTagFeed(tag, options, {
      onSuccess: (feed) => dispatch(loadFeedSuccess(feed)),
      onError: (error) => dispatch(loadFeedError(error))
    });
  };
};

export const loadAuthorFeed = (authorUsername: string) => {
  return (dispatch: Dispatch<any>, getState: GetState, container: Container) => {
    dispatch(loadAuthorFeedRequest);

    const options = withCurrentUser(getState());

    container.getAuthorFeed(authorUsername, options, {
      onSuccess: (feed) => dispatch(loadFeedSuccess(feed)),
      onError: (error) => dispatch(loadFeedError(error))
    });
  };
};

export const loadAuthorFavoritesFeed = (authorUsername: string) => {
  return (dispatch: Dispatch<any>, getState: GetState, container: Container) => {
    dispatch(loadAuthorFavoritesFeedRequest);

    const options = withCurrentUser(getState());

    container.getAuthorFavoritesFeed(authorUsername, options, {
      onSuccess: (feed) => dispatch(loadFeedSuccess(feed)),
      onError: (error) => dispatch(loadFeedError(error))
    });
  }
};

const loadAuthorFeedRequest = {
  type: FEED.LOAD_AUTHOR_FEED_REQUEST
};

const loadAuthorFavoritesFeedRequest = {
  type: FEED.LOAD_AUTHOR_FAVORITES_FEED_REQUEST
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
