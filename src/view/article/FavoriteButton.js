/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { isSameArticle, type Article } from '../../domain/article';
import { article } from '../../state/article';

type Props = {
  isFavoriting: bool,
  isAuthenticated: bool,
  article: Article,
  className?: string,
  toggleArticleFavoriteStatus: typeof article.toggleArticleFavoriteStatus
};

const FavoriteButton = (FavoriteButton) => (props: Props) => {
  const { isFavoriting, isAuthenticated } = props;

  if(isFavoriting && !isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <FavoriteButton {...props} />
};

const _NarrowFavoriteButton = FavoriteButton((props: Props) => {
  const {
    article,
    className,
    toggleArticleFavoriteStatus,
    isFavoriting
  } = props;

  return (
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
});

const _WideFavoriteButton = FavoriteButton((props: Props) => {
  const {
    article,
    className,
    toggleArticleFavoriteStatus,
    isFavoriting
  } = props;

  return (
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
});

const mapStateToProps = ({ article: { favoritingArticle }, user }, props) => ({
  isFavoriting: isSameArticle(favoritingArticle, props.article),
  isAuthenticated: Boolean(user.user)
});

const mapDispatchToProps = {
  toggleArticleFavoriteStatus: article.toggleArticleFavoriteStatus
};

export const NarrowFavoriteButton = connect(mapStateToProps, mapDispatchToProps)(_NarrowFavoriteButton);
export const WideFavoriteButton = connect(mapStateToProps, mapDispatchToProps)(_WideFavoriteButton);

