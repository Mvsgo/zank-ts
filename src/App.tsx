import './App.css';

import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import React from 'react';
import { TiThMenu } from 'react-icons/ti';
import { Link, Route, Switch } from 'react-router-dom';

import Sistema from './pages/sistemas';
import Lista from './pages/sistemas/lista';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  main: {
    flexGrow: 1,
    padding: theme.spacing(8),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <TiThMenu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Zank Web
          </Typography>
          <Button color="inherit" component={Link} to="/lista">
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <main className={classes.main}>
        <Switch>
          <div className="container">
            <Route path="/sistema/:id" exact component={Sistema}></Route>
            <Route path="/lista" exact component={Lista}></Route>
          </div>
        </Switch>
      </main>
    </div>
  );
}

export default App;
