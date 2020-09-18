import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Lista from 'src/pages/sistemas/lista';

// const Clientes = () => {
//   return <h1>Cliente !</h1>;
// };

const Produtos = () => {
  return <h1>Produtos !</h1>;
};

const HomeRoutes = () => {
  return (
    <Switch>
      <Route exact path="/home">
        <h2>Conteúdo padrão </h2>
      </Route>

      <Route path="/home/sistemas/lista" component={Lista} />
      <Route path="/home/produtos" component={Produtos} />
    </Switch>
  );
};

export default HomeRoutes;
