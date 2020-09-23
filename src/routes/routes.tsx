import React from 'react';
import { useAuth } from 'src/context/AuthContext';

import AppRoutes from './app.routes';
import LoginRoutes from './login.routes';

// pattern strategy

const Routes = () => {
  const { usuariologado } = useAuth();
  return usuariologado ? <AppRoutes /> : <LoginRoutes />;
};

export default Routes;
