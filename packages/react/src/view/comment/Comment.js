/* @flow */
import React from 'react';
import { type User } from '@rw-ddd/core/domain/user';
import { type Comment as CommentType } from '@rw-ddd/core/domain/article';
import { isAuthoredBy } from '@rw-ddd/core/domain/author';
import AuthorLink from '../author/AuthorLink';
import AuthorImage from '../author/AuthorImage';
import FormattedDate from '../date/FormattedDate';

type Props = {
  comment: CommentType,
  currentUser: ?User,
  onClickDelete: (CommentType) => void
};

const Comment = ({ comment, currentUser, onClickDelete }: Props) => (
  <div className="card">
    <div className="card-block">
      <p className="card-text">{ comment.body }</p>
    </div>
    <div className="card-footer">
      <AuthorLink author={ comment.author } className="comment-author">
        <AuthorImage author={ comment.author } className="comment-author-img" />
      </AuthorLink>
      &nbsp;
      <AuthorLink author={ comment.author } className="comment-author">
        { comment.author.username }
      </AuthorLink>
      <span className="date-posted">
        <FormattedDate date={ comment.createdAt } />
      </span>
      {
        isAuthoredBy(comment, currentUser) && (
          <span
            className="mod-options"
            onClick={ () => onClickDelete(comment) }
          >
            <i className="ion-trash-a"></i>
          </span>
        )
      }
    </div>
  </div>
);

export default Comment;
