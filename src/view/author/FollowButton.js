/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { isSameUsername, type Author } from '../../domain/author';
import { toggleAuthorFollowStatus } from '../../state/author';

type Props = {
  isFollowing: bool,
  author: Author,
  className?: string,
  toggleAuthorFollowStatus: typeof toggleAuthorFollowStatus
};

const FollowButton = ({ author, className, toggleAuthorFollowStatus, isFollowing }: Props) => (
  <button
    disabled={ isFollowing }
    onClick={ () => toggleAuthorFollowStatus(author) }
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

const mapStateToProps = ({ author: { followingAuthor } }, props) => ({
  isFollowing: isSameUsername(followingAuthor, props.author)
});

const mapDispatchToProps = {
  toggleAuthorFollowStatus: toggleAuthorFollowStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);
