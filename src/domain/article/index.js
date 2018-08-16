/* @flow */
import type { User } from '../user';
import type { Tag } from '../tag';

export type Author = {
  username: string,
  image: ?string
};

type Authorable = {
  author: Author
};

export type ArticleSlug = string;

export type Article = Authorable & {
  title: string,
  description: string,
  slug: ArticleSlug,
  createdAt: Date,
  favoritesCount: number,
  body: string,
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
  fromGlobalFeed: () => Promise<Feed>,
  fromUserFeed: (User) => Promise<Feed>,
  fromTagFeed: (Tag) => Promise<Feed>,
  getArticle: (ArticleSlug) => Promise<Article>,
  add: (EditingArticle, { user: User }) => Promise<Article>,
  update: (EditingArticle, { user: User }) => Promise<Article>
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
  add: (NewComment, { articleSlug: ArticleSlug, user: User } ) => Promise<Comment>,
  remove: (Comment, { articleSlug: ArticleSlug, user: User } ) => Promise<void>
};

export const isAuthoredBy = (authorable: Authorable, user: ?User) => (
  user && (authorable.author.username === user.username)
);
