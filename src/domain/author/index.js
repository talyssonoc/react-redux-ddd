/* @flow */
import type { User } from '../user';

export type Author = {
  username: string,
  image: ?string,
  bio: ?string,
  following: bool
};

export type Authorable = {
  author: Author
};

export type AuthorRepository = {
  getByUsername: (string, { currentUser: ?User }) => Promise<Author>
};

export const isAuthoredBy = (authorable: Authorable, user: ?User) => (
  user && (authorable.author.username === user.username)
);
