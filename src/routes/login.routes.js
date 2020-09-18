import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login, loginWithGoogle } = useAuth();
  return (
    <div>
      <h1>Login Page</h1>

      <div>
        <Link to="/forgot">Esqueci minha senha</Link>
      </div>

      <div>
        <Link to="/signup">Cadastre-se</Link>
      </div>

      <div>
        <button onClick={login}>Login</button>
        <button onClick={loginWithGoogle}>Login Com Google</button>
      </div>
    </div>
  );
};

const Forgot = () => {
  return <h1>Esqueci minha senha</h1>;
};

const Signup = () => {
  return <h1>Cadastre-se</h1>;
};

const LoginRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route path="/forgot" component={Forgot} />
      <Route path="/signup" component={Signup} />
      <Route path="*">
        <h3>rota não existe</h3>
      </Route>
    </Switch>
  );
};

export default LoginRoutes;
