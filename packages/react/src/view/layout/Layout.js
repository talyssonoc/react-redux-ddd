/* @flow */
import React, { Fragment, type Node } from 'react';
import Head from './Head';
import Nav from './Nav';
import Footer from './Footer';

export type Props = { children: Node };

const Layout = (props: Props) => {
  const { children } = props;

  return (
    <Fragment>
      <Head />
      <Nav />
      { children }
      <Footer />
    </Fragment>
  );
};

export default Layout;
