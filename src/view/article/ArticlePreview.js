/* @flow */
import React from 'react';
import type { Article } from '../../domain/article';
import AuthorLink from './AuthorLink';
import ArticleLink from './ArticleLink';
import FormattedDate from '../date/FormattedDate';

type Props = {
  article: Article
};

const ArticlePreview = ({ article }: Props) => (
  <div className="article-preview">
    <div className="article-meta">
      <AuthorLink author={ article.author }>
        <img src={ article.author.image } alt={ article.author.username } />
      </AuthorLink>
      <div className="info">
        <AuthorLink author={ article.author } className="author">
          { article.author.username }
        </AuthorLink>
        <span className="date">
          <FormattedDate date={ article.createdAt } />
        </span>
      </div>
      <button className="btn btn-outline-primary btn-sm pull-xs-right">
        <i className="ion-heart"></i> { article.favoritesCount }
      </button>
    </div>
    <ArticleLink
      article={ article }
      className="preview-link"
    >
      <h1>{ article.title }</h1>
      <p>
        { article.description }
      </p>
      <span>Read more...</span>
    </ArticleLink>
  </div>
);

export default ArticlePreview;
