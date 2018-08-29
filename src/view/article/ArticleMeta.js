/* @flow */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { type User } from '../../domain/user';
import { type Article } from '../../domain/article';
import { isAuthoredBy } from '../../domain/author';
import { WideFavoriteButton } from './FavoriteButton';
import RemoveButton from './RemoveButton';
import FormattedDate from '../date/FormattedDate';
import AuthorLink from '../author/AuthorLink';
import FollowButton from '../author/FollowButton';
import AuthorImage from '../author/AuthorImage';

type Props = {
  isRemoving: bool,
  article: Article,
  currentUser: ?User
};

const ArticleMeta = ({ article, currentUser, isRemoving }: Props) => (
  <div className="article-meta">
    <AuthorLink
      author={ article.author }
    >
      <AuthorImage author={ article.author } />
    </AuthorLink>
    <div className="info">
      <AuthorLink
        author={ article.author }
        className="author"
      >
        { article.author.username }
      </AuthorLink>
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
          <RemoveButton article={ article } isRemoving={ isRemoving } />
        </Fragment>
      ) : (
        <Fragment>
          <FollowButton author={ article.author } />
          &nbsp;&nbsp;
          <WideFavoriteButton article={ article } />
        </Fragment>
      )
    }
  </div>
);

export default ArticleMeta;
