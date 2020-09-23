import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { ISistemasFormData } from 'src/pages/sistemas/helper';

export interface ItemsMenu {
  row: ISistemasFormData;
  onClickItemMenu: (caption: string, row: any) => void;
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
      <IconButton size="small" aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleClick}>
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
        {items?.map((caption, idx) => (
          <MenuItem
            key={idx}
            onClick={() => {
              handleClose();
              Boolean(onClickItemMenu(caption, row));
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
