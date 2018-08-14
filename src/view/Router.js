import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './layout/Layout';
import HomePage from './home/HomePage';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import Article from './article/Article';
import CreateArticlePage from './article/CreateArticlePage';

const Router = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path='/' exact component={ HomePage } />
        <Route path='/login' component={ LoginPage } />
        <Route path='/register' component={ RegisterPage } />
        <Route path='/article/:slug' component={ Article } />
        <Route path='/editor' exact component={ CreateArticlePage } />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Router;
