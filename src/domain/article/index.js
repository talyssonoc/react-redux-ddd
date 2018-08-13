/* @flow */
import type { User } from '../user';
import type { Tag } from '../tag';

export type Author = {
  username: string,
  image: ?string
};

export type ArticleSlug = string;

export type Article = {
  title: string,
  description: string,
  slug: ArticleSlug,
  createdAt: Date,
  favoritesCount: number,
  author: Author,
  body: string,
  tagList: Array<Tag>
};

export type Feed = {
  articles: Array<Article>,
  articlesCount: number
};

export type ArticleRepository = {
  fromGlobalFeed: () => Promise<Feed>,
  fromUserFeed: (User) => Promise<Feed>,
  fromTagFeed: (Tag) => Promise<Feed>,
  getArticle: (ArticleSlug) => Promise<Article>
};

export type Comment = {
  id: number,
  body: string,
  author: Author,
  createdAt: Date
};

export type CommentRepository = {
  fromArticle: (ArticleSlug) => Promise<Array<Comment>>
};

export const isAuthoredBy = (article: Article, user: ?User) => (
  user && (article.author.username === user.username)
);
