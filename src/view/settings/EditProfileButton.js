/* @flow */
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  className?: string
};

const EditProfileButton = ({ className }: Props) => (
  <Link
    to="/settings"
    className={ `btn btn-sm btn-outline-secondary ${className || ''}` }
  >
    <i className="ion-gear-a"></i>
    &nbsp;
    Edit Profile Settings
  </Link>
);

export default EditProfileButton;
