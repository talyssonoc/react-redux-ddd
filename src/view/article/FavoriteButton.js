/* @flow */
import React from 'react';
import classNames from 'classnames';
import type { Article } from '../../domain/Article';

type Props = {
  article: Article
};

const FavoriteButton = ({ article }: Props) => (
  <button
    className={
      classNames('btn btn-sm pull-xs-right', {
        'btn-primary': article.favorited,
        'btn-outline-primary': !article.favorited
      })
    }
  >
    <i className="ion-heart"></i> { article.favoritesCount }
  </button>
);

export default FavoriteButton;
