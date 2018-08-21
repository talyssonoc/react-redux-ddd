/* @flow */
import React from 'react';
import { Link } from 'react-router-dom';
import type { Author } from '../../domain/author';

type Props = {
  author: Author,
  [string]: *
};

const AuthorLink = ({ author, ...props}: Props) => (
  <Link
    {...props}
    to={ `/@${ author.username }` }
  />
);

export default AuthorLink;
