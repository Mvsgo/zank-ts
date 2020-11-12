import React from 'react';
import { Link } from 'react-router-dom';
import useApi from 'src/api';

import { useAuth } from '../context/AuthContext';

//const LoginPage = (props) => {
const LoginPage = (props) => {
  const { Api } = useApi();
  const { login, loginWithGoogle } = useAuth();
  console.log('em login');

  const loginOpen = async () => {
    //await login();
    //props.history.push('/');

    const response = await Api().post('/auth/login', { email: 'teste6@gmail.com', password: '1234' });
    if (response.data.access_token) {
      console.log('access_token', response.data.access_token);
      login(response.data.access_token);
      //setUserLogged(true);
      //setToken(response.data.access_token);
      props.history.push('/');
    } else {
      console.log('access_token', ' = vazio');
      //setToken('');
      login('');
    }
  };

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
        <button onClick={loginOpen}>Login</button>
        <button onClick={loginWithGoogle}>Login Com Google</button>
      </div>
    </div>
  );
};

// const Forgot = () => {
//   return <h1>Esqueci minha senha</h1>;
// };

// const Signup = () => {
//   return <h1>Cadastre-se</h1>;
// };

// const LoginRoutes = () => {
//   return (
//     <Switch>
//       <Route exact path="/" component={LoginPage} />
//       <Route path="/forgot" component={Forgot} />
//       <Route path="/signup" component={Signup} />
//       <Route path="*">
//         <h3>rota não existe em login</h3>
//       </Route>
//     </Switch>
//   );
// };
//      <Route path="/home" component={Home} />

export default LoginPage;
