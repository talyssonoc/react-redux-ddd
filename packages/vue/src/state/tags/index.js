import { TAG } from '../mutationTypes';

const initialState = {
  tags: [],
  error: null,
  isLoading: false
};

const state = { ...initialState };

const mutations = {
  [TAG.LOAD_POPULAR_TAGS_REQUEST](state) {
    state.isLoading = true;
  },
  [TAG.LOAD_POPULAR_TAGS_SUCCESS](state, tags) {
    state.isLoading = false;
    state.tags = tags;
  },
  [TAG.LOAD_POPULAR_TAGS_ERROR](state, error) {
    state.isLoading = false;
    state.error = error;
  }
};

const actions = {
  [TAG.LOAD_POPULAR_TAGS]({ commit }) {
    commit(TAG.LOAD_POPULAR_TAGS_REQUEST);

    this.app.getPopularTags({
      onSuccess: (tags) => commit(TAG.LOAD_POPULAR_TAGS_SUCCESS, tags),
      onError: (error) => commit(TAG.LOAD_POPULAR_TAGS_ERROR, error)
    });
  }
};

export default {
  state,
  mutations,
  actions
};
