/* @flow */
import React from 'react';
import type { Article } from '../../domain/article';
import AuthorLink from '../author/AuthorLink';
import ArticleLink from './ArticleLink';
import FavoriteButton from './FavoriteButton';
import FormattedDate from '../date/FormattedDate';
import TagList from '../tag/TagList';

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
      <FavoriteButton article={ article } className="pull-xs-right" />
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
      <TagList
        as="ul"
        tags={ article.tagList }
        tagClassName="tag-outline"
      />
    </ArticleLink>
  </div>
);

export default ArticlePreview;
