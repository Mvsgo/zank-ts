import React from 'react';

import AppRoutes from './app.routes';

//import LoginRoutes from './login.routes';

//import { useAuth } from 'src/context/AuthContext';

// pattern strategy

const Routes = () => {
  //const { usuariologado } = useAuth();
  //return usuariologado ? <AppRoutes /> : <LoginRoutes />;
  return <AppRoutes />;
};

export default Routes;
