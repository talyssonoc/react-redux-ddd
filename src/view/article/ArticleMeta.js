/* @flow */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { type User } from '../../domain/user';
import { isAuthoredBy, type Article } from '../../domain/article';
import FormattedDate from '../date/FormattedDate';

type Props = {
  article: Article,
  currentUser: ?User
};

const ArticleMeta = ({ article, currentUser }: Props) => (
  <div className="article-meta">
    <a href="profile.html">
      <img src={ article.author.image } alt={ article.author.username } />
    </a>
    <div className="info">
      <a href="" className="author">{ article.author.username }</a>
      <span className="date">
        <FormattedDate date={ article.createdAt } />
      </span>
    </div>
    {
      isAuthoredBy(article, currentUser) ? (
        <Fragment>
          <Link
            to={ `/editor/${article.slug}` }
            className="btn btn-sm btn-outline-secondary"
          >
            <i className="ion-edit"></i>
            &nbsp;
            Edit Article
          </Link>
          &nbsp;&nbsp;
          <button className="btn btn-sm btn-outline-danger">
            <i className="ion-trash-a"></i>
            &nbsp;
            Delete Article
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <button className="btn btn-sm btn-outline-secondary">
            <i className="ion-plus-round"></i>
            &nbsp;
            Follow { article.author.username }
          </button>
          &nbsp;&nbsp;
          <button className="btn btn-sm btn-outline-primary">
            <i className="ion-heart"></i>
            &nbsp;
            Favorite Post <span className="counter">{ article.favoritesCount }</span>
          </button>
        </Fragment>
      )
    }
  </div>
);

export default ArticleMeta;
