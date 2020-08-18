import './index.css';

import { CssBaseline } from '@material-ui/core';
import { ConfirmProvider } from 'material-ui-confirm';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ConfirmProvider>
      <App />
    </ConfirmProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
