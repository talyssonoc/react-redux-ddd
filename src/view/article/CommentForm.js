/* @flow */
import React from 'react';
import { type User } from '../../domain/user';

type Props = {
  currentUser: User
};

const CommentForm = ({ currentUser }: Props) => (
  <form className="card comment-form">
    <div className="card-block">
      <textarea className="form-control" placeholder="Write a comment..." rows="3"></textarea>
    </div>
    <div className="card-footer">
      <img src={ currentUser.image } className="comment-author-img" alt={ currentUser.username } />
      <button className="btn btn-sm btn-primary">
       Post Comment
      </button>
    </div>
  </form>
);

export default CommentForm;
