import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Home from '../home/Home';
import LoginRoutes from './login.routes';

//import { useAuth } from 'src/context/AuthContext';

const AppRoutes = () => {
  //const { usuariologado } = useAuth();
  //const para = usuariologado ? '/home' : '/home/login';
  //console.log('usuariologado = ', usuariologado);
  console.log('em AppRoutes');
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route path="/home" component={Home} />
      <Route path="/home/login" component={LoginRoutes} />
      <Route path="*">
        <h3>rota não existe em appRoutes</h3>
      </Route>
    </Switch>
  );
};
//usuariologado ? <Redirect to="/home" /> : <Redirect to="/home/LoginPage" />
export default AppRoutes;
