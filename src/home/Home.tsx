import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { TiThMenu } from 'react-icons/ti';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import HomeRoutes from 'src/routes/home.routes';

import { useAuth } from '../context/AuthContext';

//import { BiLogOut } from 'react-icons/bi';
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    title: {
      flexGrow: 1,
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: {
      // display: 'flex',
      // alignItems: 'center',
      // justifyContent: 'flex-end',
      // padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const Home = (props: any) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { logout } = useAuth();
  const history = useHistory();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    console.log('nada?');
    history.push('/');
  };

  const handleClickMenu = (goto: string) => {
    history.push(goto);
    console.log('Props.width === ');
    //if (theme.unstable_strictMode direction != 'ltr') {
    //  setMobileOpen(!mobileOpen);
    //}
  };

  //<ListItem button key={'Sistemas'} component={Link} to="/home/lista" >
  const drawer = (
    <div>
      <div className={classes.toolbar}>
        {/* <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} className={classes.menuButton}>
          <IoIosArrowBack />
        </IconButton> */}
      </div>
      <Divider />
      <List>
        <ListItem button key={'Sistemas'} onClick={() => handleClickMenu('/home/lista')}>
          <ListItemIcon>
            <TiThMenu />
          </ListItemIcon>
          <ListItemText primary={'Sistemas'} />
        </ListItem>
      </List>

      <Divider />
      <List>
        <ListItem button key={'Dashboard'} component={Link} to="/home/dashboard">
          <ListItemIcon>
            <TiThMenu />
          </ListItemIcon>
          <ListItemText primary={'Dashboard'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <TiThMenu /> : <IoIosArrowBack />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} className={classes.menuButton}>
            <TiThMenu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <IconButton color="inherit" edge="end" onClick={handleLogout}>
            <RiLogoutCircleLine />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {/* A implementação pode ser trocada por js para evitar a duplicação de links de SEO. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <HomeRoutes />
      </main>
    </div>
  );
};
export default Home;
