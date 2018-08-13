/* @flow */
import React from 'react';
import { Link } from 'react-router-dom';
import { type Comment as CommentType } from '../../domain/article';
import FormattedDate from '../date/FormattedDate';

type Props = {
  comment: CommentType
};

const Comment = ({ comment }: Props) => (
  <div className="card">
    <div className="card-block">
      <p className="card-text">{ comment.body }</p>
    </div>
    <div className="card-footer">
      <Link to={ `/@${comment.author.username}` } className="comment-author">
        <img
          src={ comment.author.image }
          alt={ comment.author.username }
          className="comment-author-img"
        />
      </Link>
      &nbsp;
      <Link to={ `/@${comment.author.username}` } className="comment-author">
        { comment.author.username }
      </Link>
      <span className="date-posted">
        <FormattedDate date={ comment.createdAt } />
      </span>
    </div>
  </div>
);

export default Comment;
