/* @flow */
import React from 'react';
import classNames from 'classnames';
import type { Article } from '../../domain/article';

type Props = {
  article: Article
};

const FavoriteButton = ({ article }: Props) => (
  <button
    className={
      classNames('btn btn-sm', {
        'btn-primary': article.favorited,
        'btn-outline-primary': !article.favorited
      })
    }
  >
    <i className="ion-heart"></i>
    &nbsp;
    { article.favorited ? 'Unfavorite Article' : 'Favorite Post' }
    &nbsp;
    <span className="counter">{ article.favoritesCount }</span>
  </button>
);

export default FavoriteButton;
