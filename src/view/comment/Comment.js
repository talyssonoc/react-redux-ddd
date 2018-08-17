/* @flow */
import React from 'react';
import { type User } from '../../domain/user';
import { isAuthoredBy, type Comment as CommentType } from '../../domain/article';
import AuthorLink from '../article/AuthorLink';
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
        <img
          src={ comment.author.image }
          alt={ comment.author.username }
          className="comment-author-img"
        />
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
