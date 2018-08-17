/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Author } from '../../domain/article';

type Props = {
  authorUsername: string,
  author: ?Author
};

class AuthorPage extends Component<Props> {
  render() {
    const { authorUsername } = this.props;

    return authorUsername;
  }
}

const mapStateToProps = (_, props) => ({
  authorUsername: props.match.params.username
});

export default connect(mapStateToProps)(AuthorPage);
