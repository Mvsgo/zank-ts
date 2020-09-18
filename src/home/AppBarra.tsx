import { IconButton, Toolbar, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { TiThMenu } from 'react-icons/ti';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    title: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },

    hide: {
      display: 'none',
    },
  })
);

//const AppBarra: React.FC<React.ReactNode> = (props) => {
//children: AppBarProps
const AppBarra = (props: any) => {
  const classes = useStyles();
  //const theme = useTheme();
  //const [open, setOpen] = React.useState(false);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.setDrawer,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.openDrawer}
            edge="start"
            className={clsx(classes.menuButton, props.openWith && classes.hide)}
          >
            <TiThMenu />
          </IconButton>

          <Typography variant="h5" className={classes.title}>
            Zank Web
          </Typography>

          <IconButton color="inherit" onClick={props.setLogout}>
            <RiLogoutCircleLine />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppBarra;
