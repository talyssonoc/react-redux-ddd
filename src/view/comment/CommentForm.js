/* @flow */
import React, { Component } from 'react';
import { type User } from '../../domain/user';
import AuthorImage from '../author/AuthorImage';

type Props = {
  currentUser: User,
  onSubmit: (string) => void
};

type State = {
  commentBody: string
};

class CommentForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      commentBody: ''
    };
  }

  updateBody(commentBody: string) {
    this.setState({ commentBody });
  }

  handleSubmit = (event: Event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.commentBody);
    this.setState({ commentBody: '' });
  };

  render() {
    const { currentUser } = this.props;
    const { commentBody } = this.state;

    return (
      <form
        onSubmit={ this.handleSubmit }
        className="card comment-form"
      >
        <div className="card-block">
          <textarea
            onChange={ (e) => this.updateBody(e.target.value) }
            value={ commentBody }
            className="form-control"
            placeholder="Write a comment..."
            rows="3"
          ></textarea>
        </div>
        <div className="card-footer">
          <AuthorImage author={ currentUser } className="comment-author-img" />
          <button className="btn btn-sm btn-primary">
           Post Comment
          </button>
        </div>
      </form>
    );
  }
}

export default CommentForm;
