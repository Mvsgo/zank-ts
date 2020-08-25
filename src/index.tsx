import './index.css';

import { CssBaseline } from '@material-ui/core';
import { ConfirmProvider } from 'material-ui-confirm';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import AppBarra from './AppBarra';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <ConfirmProvider>
        <AppBarra />
      </ConfirmProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
