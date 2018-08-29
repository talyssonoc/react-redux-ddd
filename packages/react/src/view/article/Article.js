/* @flow */
import React, { Fragment } from 'react';
import Markdown from 'react-markdown';
import { type User } from '@rw-ddd/core/domain/user';
import type { Comment as CommentType, Article as ArticleType } from '@rw-ddd/core/domain/article';
import TagList from '../tag/TagList';
import ArticleMeta from './ArticleMeta';
import CommentForm from '../comment/CommentForm';
import Comment from '../comment/Comment';

type Props = {
  user: User,
  article: ArticleType,
  isRemoving: bool,
  comments: Array<CommentType>,
  addComment: (*) => void,
  removeComment: (*) => void
};

const Article = ({ user, article, isRemoving, comments, addComment, removeComment }: Props) => (
  <Fragment>
    <div className="banner">
      <div className="container">
        <h1>{ article.title }</h1>

        <ArticleMeta
          article={ article }
          currentUser={ user }
          isRemoving={ isRemoving }
        />
      </div>
    </div>

    <div className="container page">
      <div className="row article-content">
        <div className="col-md-12">
          <Markdown source={ article.body } />
          <TagList
            tags={ article.tagList }
            tagClassName="tag-outline"
          />
        </div>
      </div>

      <hr />

      <div className="article-actions">
        <ArticleMeta
          article={ article }
          currentUser={ user }
          isRemoving={ isRemoving }
        />
      </div>

      <div className="row">

        <div className="col-xs-12 col-md-8 offset-md-2">

          {
            user && (
              <CommentForm
                currentUser={ user }
                onSubmit={ addComment }
              />
            )
          }

          {
            comments.map((comment) =>
              <Comment
                key={ comment.id }
                comment={ comment }
                currentUser={ user }
                onClickDelete={ removeComment }
              />
            )
          }
        </div>
      </div>
    </div>
  </Fragment>
);

export default Article;
