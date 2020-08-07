import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import React from 'react';

interface Sistema {
  nome: string;
  ativo: boolean;
  id: number;
}

interface ItemsMenu {
    caption: string;
    funcao: string;
}

// eslint-disable-next-line react/prop-types
const CustomMenu = (items:[{}]) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleClick}>
        ?
      </IconButton>
      <Menu
        id="menu"
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Item One</MenuItem>

        <MenuItem>Item Two</MenuItem>

        <Divider />

        <MenuItem>
          <Typography variant="inherit">Delete</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CustomMenu;
