/* @flow */
import type { State } from './store';
import type { WithCurrentUser } from '@rw-ddd/core/domain/user';

const withCurrentUser = (state: State): WithCurrentUser => ({
  currentUser: state.user.user
});

export default withCurrentUser;
