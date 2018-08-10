/* @flow */
export type User = {
  email: string,
  token: string,
  username: string,
  bio: string,
  image: ?string
};

export type UserAuthInfo = {
  username?: string,
  email?: string,
  password?: ?string
};

export type UserRepository = {
  fromAuthInfo: (UserAuthInfo) => Promise<User>,
  add: (UserAuthInfo) => Promise<User>
};
