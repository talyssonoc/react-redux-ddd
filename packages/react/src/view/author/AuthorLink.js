/* @flow */
import React, { type ComponentType } from 'react';
import { Link } from 'react-router-dom';
import type { User } from '@rw-ddd/core/domain/user';
import type { Author } from '@rw-ddd/core/domain/author';

type Props = {
  author: Author | User,
  as?: ComponentType<any>,
  [string]: *
};

const AuthorLink = ({ as: Component, author, ...props}: Props) => {
  Component = Component || Link;

  return (
    <Component
      {...props}
      to={ `/@${ author.username }` }
    />
  );
};

export default AuthorLink;
