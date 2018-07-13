import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './home/Home';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={ Home } />
      <Route path='/login' component={ LoginPage } />
      <Route path='/register' component={ RegisterPage } />
    </Switch>
  </BrowserRouter>
);

export default Router;
