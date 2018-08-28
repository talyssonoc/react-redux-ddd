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
  toggleArticleFavoriteStatus: typeof article.toggleArticleFavoriteStatus
};

const _FavoriteButton = ({ article, className, toggleArticleFavoriteStatus, isFavoriting }: Props) => (
  <button
    disabled={ isFavoriting }
    onClick={ () => toggleArticleFavoriteStatus(article) }
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

const _WideFavoriteButton = ({ article, className, toggleArticleFavoriteStatus, isFavoriting }: Props) => (
  <button
    disabled={ isFavoriting }
    onClick={ () => toggleArticleFavoriteStatus(article) }
    className={
      classNames('btn btn-sm', className, {
        'btn-primary': article.favorited,
        'btn-outline-primary': !article.favorited
      })
    }
  >
    <i className="ion-heart"></i>
    &nbsp;
    { article.favorited ? 'Unfavorite Article' : 'Favorite Article' }
    &nbsp;
    <span className="counter">{ article.favoritesCount }</span>
  </button>
);

const mapStateToProps = ({ article: { favoritingArticle } }, props) => ({
  isFavoriting: isSameArticle(favoritingArticle, props.article)
});

const mapDispatchToProps = {
  toggleArticleFavoriteStatus: article.toggleArticleFavoriteStatus
};

export const FavoriteButton = connect(mapStateToProps, mapDispatchToProps)(_FavoriteButton);
export const WideFavoriteButton = connect(mapStateToProps, mapDispatchToProps)(_WideFavoriteButton);

