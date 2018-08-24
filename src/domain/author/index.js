/* @flow */
import type { User, WithCurrentUser } from '../user';

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
  getByUsername: (string, WithCurrentUser) => Promise<Author>,
  setAsFollowing: (string, WithCurrentUser) => Promise<Author>,
  unsetAsFollowing: (string, WithCurrentUser) => Promise<Author>
};

export const isAuthoredBy = (authorable: Authorable, user: ?User): bool => (
  !!user && isSameUsername(authorable.author, user)
);

export const updateAuthor = (authorable: ?Authorable, author: Author): ?$Subtype<Authorable> => {
  if(!authorable) {
    return null;
  }

  return {
    ...authorable,
    author: isSameUsername(authorable.author, author) ? author : authorable.author
  };
};

type WithUsername = { username: string };

export const isSameUsername = (a: ?WithUsername, b: ?WithUsername) => (
  (a && b) ? a.username === b.username : false
);
