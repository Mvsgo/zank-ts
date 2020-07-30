import './App.css';

import { makeStyles } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';

import Sistema from './pages/sistemas';
import Lista from './pages/sistemas/lista';

const useStyles = makeStyles({
  app:{
    height:'100vh',
    width:'100%',
  }
});

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <NavLink to="/" className="navbar-brand">Posts Manager</NavLink>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link" activeStyle={{ fontWeight: 'bold' }} to="/" exact>Posts</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeStyle={{ fontWeight: 'bold' }} to="/create">Novo cadastro</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeStyle={{ fontWeight: 'bold' }} to="/lista">Lista de sistemas</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="container">
                <br />
                <Route path="/create" exact component={Sistema}></Route>
                <Route path="/lista" exact component={Lista}></Route>
            </div>
        </BrowserRouter>
      {/* <Sistema /> */}
    </div>
  );
};

export default App;
