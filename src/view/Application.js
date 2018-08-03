/* @flow */
import React from 'react';
import { Provider } from 'react-redux';
import Router from './Router';

export type Props = { store: Object };

const Application = (props: Props) => {
  const { store } = props;

  return (
    <Provider store={ store }>
      <Router />
    </Provider>
  );
};

export default Application;
