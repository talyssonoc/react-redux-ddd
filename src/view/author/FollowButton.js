/* @flow */
import React from 'react';
import classNames from 'classnames';
import { type Author } from '../../domain/author';

type Props = {
  author: Author,
  className?: string
};

const FollowButton = ({ author, className }: Props) => (
  <button
    className={
      classNames('btn btn-sm', className, {
        'btn-secondary': author.following,
        'btn-outline-secondary': !author.following
      })
    }
  >
    <i className="ion-plus-round"></i>
    &nbsp;
    { author.following ? 'Unfollow' : 'Follow' } { author.username }
  </button>
);

export default FollowButton;
