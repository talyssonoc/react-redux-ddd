import { FEED } from '../mutationTypes';

const initialState = {
  articles: [],
  isLoading: false,
  error: null
};

const state = { ...initialState };

const mutations = {
  [FEED.LOAD_GLOBAL_FEED_REQUEST](state) {
    state.isLoading = true;
  },
  [FEED.LOAD_GLOBAL_FEED_SUCCESS](state, feed) {
    state.isLoading = false;
    state.articles = feed.articles;
  },
  [FEED.LOAD_GLOBAL_FEED_ERROR](state, error) {
    state.isLoading = false;
    state.error = error;
  }
};

const actions = {
  [FEED.LOAD_GLOBAL_FEED]({ commit }) {
    commit(FEED.LOAD_GLOBAL_FEED_REQUEST);

    this.app.getGlobalFeed({}, {
      onSuccess: (feed) => commit(FEED.LOAD_GLOBAL_FEED_SUCCESS, feed),
      onError: (error) => commit(FEED.LOAD_GLOBAL_FEED_ERROR, error)
    });
  }
};

export default {
  state,
  mutations,
  actions
};
