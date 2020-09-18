import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Home from '../home/Home';

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>

      <Route path="/home" component={Home} />
    </Switch>
  );
};

export default AppRoutes;
