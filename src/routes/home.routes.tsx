import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from 'src/context/AuthContext';
import Dashboard from 'src/pages/dashboard';
import Lista from 'src/pages/sistemas/lista';

import LoginPage from './login.routes';

// const Clientes = () => {
//   return <h1>Cliente !</h1>;
// };

const Produtos = () => {
  return <h1>Produtos !</h1>;
};

const HomeRoutes = () => {
  console.log('em Home');
  const { usuariologado } = useAuth();
  const para = usuariologado ? '/home/dashboard' : '/home/login';
  console.log('vai para = ', para);
  console.log('useLocation.name', useLocation().pathname);
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={para} />
      </Route>
      <Route path="/home/login" component={LoginPage} />
      <Route path="/home/lista" component={Lista} />
      <Route path="/home/produtos" component={Produtos} />
      <Route path="/home/dashboard" component={Dashboard} />
      {/* <Route path="*">
        <h3>rota não existe em home</h3>
        <h3>{useLocation().pathname}</h3>
      </Route> */}
    </Switch>
  );
};

export default HomeRoutes;
