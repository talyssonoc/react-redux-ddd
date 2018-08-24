/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { isSameArticle, type Article } from '../../domain/article';
import { article } from '../../state/article';

type Props = {
  isFavoriting: bool,
  article: Article,
  className?: string,
  toggleFavoriteArticle: typeof article.toggleFavoriteArticle
};

const _FavoriteButton = ({ article, className, toggleFavoriteArticle, isFavoriting }: Props) => (
  <button
    disabled={ isFavoriting }
    onClick={ () => toggleFavoriteArticle(article) }
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

const _WideFavoriteButton = ({ article, className, toggleFavoriteArticle, isFavoriting }: Props) => (
  <button
    disabled={ isFavoriting }
    onClick={ () => toggleFavoriteArticle(article) }
    className={
      classNames('btn btn-sm', className, {
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

const mapStateToProps = ({ article: { favoritingArticle } }, props) => ({
  isFavoriting: isSameArticle(favoritingArticle, props.article)
});

const mapDispatchToProps = {
  toggleFavoriteArticle: article.toggleFavoriteArticle
};

export const FavoriteButton = connect(mapStateToProps, mapDispatchToProps)(_FavoriteButton);
export const WideFavoriteButton = connect(mapStateToProps, mapDispatchToProps)(_WideFavoriteButton);

