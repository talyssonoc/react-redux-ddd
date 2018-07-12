import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './home/Home';
import { LoginPage } from './auth/Login';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={ Home } />
      <Route path='/login' component={ LoginPage } />
    </Switch>
  </BrowserRouter>
);

export default Router;
