/* @flow */
import React from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '../../domain/article';
import FormattedDate from '../date/FormattedDate';

type Props = {
  article: Article
};

const ArticlePreview = ({ article }: Props) => (
  <div className="article-preview">
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
      <button className="btn btn-outline-primary btn-sm pull-xs-right">
        <i className="ion-heart"></i> { article.favoritesCount }
      </button>
    </div>
    <Link
      to={ `/article/${article.slug}` }
      className="preview-link"
    >
      <h1>{ article.title }</h1>
      <p>
        { article.description }
      </p>
      <span>Read more...</span>
    </Link>
  </div>
);

export default ArticlePreview;
