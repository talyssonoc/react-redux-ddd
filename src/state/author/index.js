/* @flow */
import type { Dispatch, Reducer } from 'redux';
import typeof * as Container from '../../container';
import type { GetState } from '../store';
import type { Author } from '../../domain/author';
import withCurrentUser from '../withCurrentUser';
import { AUTHOR } from '../actionTypes';

export type AuthorState = {|
  author: ?Author,
  errors: ?Object,
  isLoading: bool
|};

const initialState: AuthorState = {
  author: null,
  errors: null,
  isLoading: false
};

export const authorReducer: Reducer<AuthorState, any> = (state = initialState, action) => {
  switch(action.type) {
    case AUTHOR.LOAD_AUTHOR_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: null
      };

    case AUTHOR.LOAD_AUTHOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        author: action.author
      };

    case AUTHOR.LOAD_AUTHOR_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: action.errors
      };

    default:
      return state;
  }
};

export const loadAuthor = (authorUsername: string) => {
  return (dispatch: Dispatch<any>, getState: GetState, container: Container) => {
    dispatch(loadAuthorRequest);

    const options = withCurrentUser(getState());

    container.getAuthor(authorUsername, options, {
      onSuccess: (author) => dispatch(loadAuthorSuccess(author)),
      onError: (error) => dispatch(loadAuthorError(error))
    });
  };
};

const loadAuthorRequest = {
  type: AUTHOR.LOAD_AUTHOR_REQUEST
};

const loadAuthorSuccess = (author) => ({
  type: AUTHOR.LOAD_AUTHOR_SUCCESS,
  author
});

const loadAuthorError = (error) => ({
  type: AUTHOR.LOAD_AUTHOR_ERROR,
  error
});
