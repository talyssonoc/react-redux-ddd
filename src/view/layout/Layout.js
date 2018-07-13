import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';
import Footer from './Footer';

const Layout = ({ children }) => (
  <Fragment>
    <Nav />
    { children }
    <Footer />
  </Fragment>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
