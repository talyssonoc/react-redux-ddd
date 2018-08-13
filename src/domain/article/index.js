/* @flow */
import type { User } from '../user';
import type { Tag } from '../tag';
export type Article = {
  title: string,
  description: string,
  slug: string,
  createdAt: Date,
  favoritesCount: number,
  author: Author
};

export type Author = {
  username: string,
  image: ?string
};

export type Feed = {
  articles: Array<Article>,
  articlesCount: number
};

export type ArticleRepository = {
  fromGlobalFeed: () => Promise<Feed>,
  fromUserFeed: (User) => Promise<Feed>,
  fromTagFeed: (Tag) => Promise<Feed>
};
