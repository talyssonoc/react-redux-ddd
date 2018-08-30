/* @flow */
export type User = {
  email: string,
  token: string,
  username: string,
  bio: string,
  image: ?string
};

export type EditingUser = {
  email: string,
  username: string,
  bio: ?string,
  image: ?string,
  password: ?string
};

export type UserAuthInfo = {
  username?: string,
  email?: string,
  password?: ?string
};

export type WithCurrentUser = {
  currentUser: ?User
};

export type UserRepository = {
  byAuthInfo: (UserAuthInfo) => Promise<User>,
  add: (UserAuthInfo) => Promise<User>,
  update: (EditingUser, WithCurrentUser) => Promise<User>,
  getByToken: (WithCurrentUser) => Promise<User>
};
