/* @flow */
import React from 'react';

type Imageable = {
  username: string,
  image: ?string
};

type Props = {
  author: Imageable,
  className?: string
};

const AuthorImage = ({ author, className }: Props) => (
  author.image ? (
    <img
      className={ className }
      src={ author.image }
      alt={ author.username }
    />
  ) : null
);

export default AuthorImage;
