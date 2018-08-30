/* @flow */
import React from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '@rw-ddd/core/domain/article';

type Props = {
  article: Article,
  [string]: *
};

const ArticleLink = ({ article, ...props}: Props) => (
  <Link
    {...props}
    to={ `/article/${article.slug}` }
  />
);

export default ArticleLink;
