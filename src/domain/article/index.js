/* @flow */
import type { User, WithCurrentUser } from '../user';
import type { Tag } from '../tag';
import type { Authorable } from '../author';

export type ArticleSlug = string;

export type Article = Authorable & {
  title: string,
  description: string,
  slug: ArticleSlug,
  createdAt: Date,
  favoritesCount: number,
  body: string,
  favorited: bool,
  tagList: Array<Tag>
};

export type EditingArticle = {
  title: string,
  description: string,
  slug?: ArticleSlug,
  body: string,
  tagList: Array<Tag>
};

export type Feed = {
  articles: Array<Article>,
  articlesCount: number
};

export type ArticleRepository = {
  fromGlobalFeed: (WithCurrentUser) => Promise<Feed>,
  fromUserFeed: (?User) => Promise<Feed>,
  fromTagFeed: (Tag, WithCurrentUser) => Promise<Feed>,
  fromAuthorFeed: (string, WithCurrentUser) => Promise<Feed>,
  fromAuthorFavorites: (string, WithCurrentUser) => Promise<Feed>,
  getArticle: (ArticleSlug, WithCurrentUser) => Promise<Article>,
  add: (EditingArticle, WithCurrentUser) => Promise<Article>,
  update: (EditingArticle, WithCurrentUser) => Promise<Article>
};

export type NewComment = {
  body: string
};

export type Comment = Authorable & NewComment & {
  id: number,
  createdAt: Date
};

export type CommentRepository = {
  fromArticle: (ArticleSlug) => Promise<Array<Comment>>,
  add: (NewComment, WithCurrentUser & { articleSlug: ArticleSlug } ) => Promise<Comment>,
  remove: (Comment, WithCurrentUser & { articleSlug: ArticleSlug } ) => Promise<void>
};
