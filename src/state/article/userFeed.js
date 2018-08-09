import { ARTICLE } from '../actionTypes';

const initialState = {
  articles: [],
  isLoading: false,
  error: null
};

export const userFeedReducer = (state = initialState, action) => {
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

export const loadUserFeed = () => (dispatch, getState, container) => {
  dispatch(loadUserFeedRequest);

  const { user } = getState();

  container.getUserFeed(user, {
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
