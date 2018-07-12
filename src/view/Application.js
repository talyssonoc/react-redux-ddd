import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Router from './Router';

const Application = ({ store }) => (
  <Provider store={ store }>
    <Router />
  </Provider>
);

Application.propTypes = {
  store: PropTypes.object.isRequired
};

export default Application;
