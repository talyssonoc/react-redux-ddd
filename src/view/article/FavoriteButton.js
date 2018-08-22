/* @flow */
import React from 'react';
import classNames from 'classnames';
import type { Article } from '../../domain/article';

type Props = {
  article: Article,
  className?: string
};

const FavoriteButton = ({ article, className }: Props) => (
  <button
    className={
      classNames('btn btn-sm', className, {
        'btn-primary': article.favorited,
        'btn-outline-primary': !article.favorited
      })
    }
  >
    <i className="ion-heart"></i> { article.favoritesCount }
  </button>
);

export default FavoriteButton;
