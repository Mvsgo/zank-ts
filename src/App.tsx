import './App.css';

import { AppBar, Button, IconButton, List, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import React from 'react';
import { TiThMenu } from 'react-icons/ti';
import { Link, Route, Switch } from 'react-router-dom';

import Scrap from './pages/scrap';
import Sistema from './pages/sistemas';
import Lista from './pages/sistemas/lista';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  main: {
    display: 'flex',
    flexGrow: 1,
    padding: theme.spacing(1),
    //justifyContent: 'center',
    height: '100vh',
    width: '100%',
  },
}));

function App() {
  const classes = useStyles();
  //, { [classes.appBarShift]: open })
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <TiThMenu />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            Zank Web
          </Typography>
          {/* <Button color="inherit" component={Link} to="/lista">
            Login
          </Button> */}
          <Button color="inherit" component={Link} to="/scrap">
            scrap
          </Button>
        </Toolbar>
      </AppBar>

      <main className={classes.main}>
        <Switch>
          <Route path="/sistema/:id" exact component={Sistema}></Route>
          <Route path="/lista" exact component={Lista}></Route>
          <Route path="/scrap" exact component={Scrap}></Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
