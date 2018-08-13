/* @flow */
export type Tag = string;

export type TagRepository = {
  getPopularTags: () => Promise<Array<Tag>>
};
