/* @flow */
import { Component, type Node } from 'react';
import { connect } from 'react-redux';
import { loadUser, UserStatuses, type UserState } from '../../state/user';

type Props = {
  user: UserState,
  loadUser: typeof loadUser,
  children: Node
};

class AuthBoundary extends Component<Props> {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    const { user, children } = this.props;

    if(user.status === UserStatuses.INIT || user.status === UserStatuses.SIGNING) {
      return null;
    }

    return children;
  }
}

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = {
  loadUser
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthBoundary);
