import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import Layout from './layout/Layout';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';

const Router = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path='/' exact component={ HomePage } />
        <Route path='/login' component={ LoginPage } />
        <Route path='/register' component={ RegisterPage } />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Router;
