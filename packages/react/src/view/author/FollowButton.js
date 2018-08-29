/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { isSame, type Author } from '@rw-ddd/core/domain/author';
import { toggleAuthorFollowStatus } from '../../state/author';

type Props = {
  isFollowing: bool,
  isAuthenticated: bool,
  author: Author,
  className?: string,
  toggleAuthorFollowStatus: typeof toggleAuthorFollowStatus
};

const FollowButton = (props: Props) => {
  const {
    author,
    className,
    toggleAuthorFollowStatus,
    isFollowing, isAuthenticated
  } = props;

  if(isFollowing && !isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
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
  )
};

const mapStateToProps = ({ author: { followingAuthor }, user }, props) => ({
  isAuthenticated: Boolean(user.user),
  isFollowing: isSame(followingAuthor, props.author)
});

const mapDispatchToProps = {
  toggleAuthorFollowStatus: toggleAuthorFollowStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);
