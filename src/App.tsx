import './App.css';

import { makeStyles } from '@material-ui/core';
import React from 'react';

import Sistema from './pages/sistemas';

const useStyles = makeStyles({
  app:{
    height:'100vh',
    width:'100%',
  }
});

function App() {
  return (
    <div className="App">
      <Sistema />
    </div>
  );
};

export default App;
