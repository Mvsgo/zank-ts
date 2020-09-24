import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
import useApi from 'src/api';

interface IAuthContext {
  access_token: string;
  usuariologado: boolean;
  login: () => void;
  logout: () => void;
  loginWithGoogle: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

//export const AuthProvider = ({ children }) => {
export const AuthProvider = (props: PropsWithChildren<{}>) => {
  const { children } = props;
  const [userLogged, setUserLogged] = useState(false);
  const [token, setToken] = useState('');
  const { Api } = useApi();

  const login = async () => {
    const response = await Api().post('/auth/login', { email: 'teste6@gmail.com', password: '1234' });
    if (response.data.access_token) {
      console.log('access_token', response.data.access_token);
      setUserLogged(true);
      setToken(response.data.access_token);
    } else {
      console.log('access_token', ' = vazio');
      setToken('');
    }
    //setUserLogged(true);
    //setToken('');
  };

  const loginWithGoogle = () => {
    setUserLogged(true);
  };

  const logout = () => {
    //props.history.push('/');
    setUserLogged(false);
    setToken('');
  };

  return (
    <AuthContext.Provider
      value={{
        access_token: token,
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
  try {
    const ctx = useContext(AuthContext);
    return ctx;
  } catch (error) {
    throw new Error('contexto não encontrado - AuthContext : ' + error);
  }
};
