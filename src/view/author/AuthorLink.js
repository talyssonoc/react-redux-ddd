/* @flow */
import React, { type ComponentType } from 'react';
import { Link } from 'react-router-dom';
import type { User } from '../../domain/User';
import type { Author } from '../../domain/author';

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
