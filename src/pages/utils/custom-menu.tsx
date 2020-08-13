import { ListItemSecondaryAction } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { FiMoreVertical } from 'react-icons/fi';

interface Sistema {
  nome: string;
  ativo: boolean;
  id: number;
}

export interface ItemsMenu {
  row: Sistema;
  onClickItemMenu: (caption: string, row: Sistema) => void;
  items: string[];
}

//items: Array<{ caption: string }>;
const CustomMenu: React.FC<ItemsMenu> = (props) => {
  const { row, onClickItemMenu, items } = props;

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
        <FiMoreVertical />
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
        {items?.map((caption) => (
          <MenuItem
            onClick={() => {
              handleClose();
              onClickItemMenu(caption, row);
            }}
          >
            <Typography variant="inherit">{caption}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CustomMenu;
