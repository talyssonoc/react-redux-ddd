/* @flow */
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute, PublicOnlyRoute } from './auth/controlledRoute';
import Layout from './layout/Layout';
import HomePage from './home/HomePage';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import Article from './article/Article';
import CreateArticlePage from './article/CreateArticlePage';
import EditArticlePage from './article/EditArticlePage';
import ProfilePage from './author/ProfilePage';

const Router = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path='/' exact component={ HomePage } />
        <PublicOnlyRoute path='/login' component={ LoginPage } />
        <PublicOnlyRoute path='/register' component={ RegisterPage } />
        <Route path='/article/:slug' component={ Article } />
        <Route path='/@:username' exact component={ ProfilePage } />
        <PrivateRoute path='/editor' exact component={ CreateArticlePage } />
        <PrivateRoute path='/editor/:slug' exact component={ EditArticlePage } />
        <Redirect to='/' />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Router;
