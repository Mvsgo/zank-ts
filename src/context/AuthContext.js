import React, { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext({
  usuariologado: Boolean,
  login: Function,
  logout: Function,
  loginWithGoogle: Function,
});

//export const AuthProvider = ({ children }) => {
export const AuthProvider = (props) => {
  const { children } = props;
  const history = useHistory();
  const [userLogged, setUserLogged] = useState(false);

  const login = () => {
    setUserLogged(true);
  };

  const loginWithGoogle = () => {
    setUserLogged(true);
  };

  const logout = () => {
    history.push('/');
    setUserLogged(false);
  };

  return (
    <AuthContext.Provider
      value={{
        usuariologado: userLogged,
        login,
        logout,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
