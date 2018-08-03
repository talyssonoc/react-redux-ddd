/* @flow */
import React, { Fragment, Node } from 'react';
import Nav from './Nav';
import Footer from './Footer';

export type Props = { children: Node };

const Layout = (props: Props) => {
  const { children } = props;

  return (
    <Fragment>
      <Nav />
      { children }
      <Footer />
    </Fragment>
  );
};

export default Layout;
