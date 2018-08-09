import { ARTICLE } from '../actionTypes';

const initialState = {
  articles: [],
  isLoading: false,
  error: null
};

export const globalFeedReducer = (state = initialState, action) => {
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

export const loadGlobalFeed = () => (dispatch, _, container) => {
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
