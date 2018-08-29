/* @flow */
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute, PublicOnlyRoute } from './auth/controlledRoute';
import Layout from './layout/Layout';
import HomePage from './home/HomePage';
import AuthBoundary from './auth/AuthBoundary';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import ArticlePage from './article/ArticlePage';
import CreateArticlePage from './article/CreateArticlePage';
import EditArticlePage from './article/EditArticlePage';
import ProfilePage from './author/ProfilePage';
import SettingsPage from './settings/SettingsPage';

const Router = () => (
  <AuthBoundary>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/' exact component={ HomePage } />
          <PublicOnlyRoute path='/login' component={ LoginPage } />
          <PublicOnlyRoute path='/register' component={ RegisterPage } />
          <Route path='/article/:slug' component={ ArticlePage } />
          <Route path='/@:username' exact component={ ProfilePage } />
          <PrivateRoute path='/editor' exact component={ CreateArticlePage } />
          <PrivateRoute path='/editor/:slug' exact component={ EditArticlePage } />
          <PrivateRoute path='/settings' exact component={ SettingsPage } />
          <Redirect to='/' />
        </Switch>
      </Layout>
    </BrowserRouter>
  </AuthBoundary>
);

export default Router;
