export const get = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch(err) {
    console.error('CacheError', err);
    return null;
  }
};

export const set = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch(err) {
    console.error('CacheError', err);
  }
};

export const PERSISTED_STATE_KEY = 'persistedState';

export const getCachedState = () => get(PERSISTED_STATE_KEY) || {};
export const cacheState = (state) => set(PERSISTED_STATE_KEY, extractPersistableState(state));

const extractPersistableState = (state) => ({
  user: state.user
});
