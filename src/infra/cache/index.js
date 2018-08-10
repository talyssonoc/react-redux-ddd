/* @flow */
export const get = (key: string) => {
  try {
    const rawValue = ((localStorage.getItem(key): any): string);
    return JSON.parse(rawValue);
  } catch(err) {
    console.error('CacheError', err);
    return null;
  }
};

export const set = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch(err) {
    console.error('CacheError', err);
  }
};

export const PERSISTED_STATE_KEY = 'persistedState';

export const getCachedState = () => get(PERSISTED_STATE_KEY) || {};
export const cacheState = (state: any) => set(PERSISTED_STATE_KEY, extractPersistableState(state));

const extractPersistableState = (state) => ({
  user: state.user
});
