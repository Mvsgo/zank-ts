import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, useTheme } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { TiThMenu } from 'react-icons/ti';
import { Link } from 'react-router-dom';

//const drawerWidth = 240;

const useStyles = (props: any) =>
  makeStyles((theme: Theme) =>
    createStyles({
      drawer: {
        width: props.varWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: props.varWidth,
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -props.drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    })
  );

const DrawerBarra = (props: any) => {
  const classes = useStyles(props)();
  const theme = useTheme();
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={props.varDrawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={props.setDrawer}>{theme.direction === 'ltr' ? <TiThMenu /> : <RiLogoutCircleLine />}</IconButton>
      </div>

      <Divider />

      <List>
        <ListItem button key={'Sistemas'} component={Link} to="home/sistemas/lista">
          <ListItemIcon>
            <TiThMenu />
          </ListItemIcon>
          <ListItemText primary={'Sistemas'} />
        </ListItem>
      </List>

      <Divider />

      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <TiThMenu /> : <TiThMenu />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default DrawerBarra;
