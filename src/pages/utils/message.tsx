import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';

const ConfirmDialog = (props: any) => {
  const { title, children, open, setOpen, onConfirm } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));  
  
  return (
    <div>
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullScreen={fullScreen}
      aria-labelledby="responsive-dialog-title"      
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {children}
        </DialogContentText>
      </DialogContent>

      <DialogActions>

         <Button autoFocus onClick={() => {setOpen(false); onConfirm();}} color="primary">
            Não
          </Button>

          <Button onClick={() => {setOpen(true); onConfirm();}} color="primary" autoFocus>
            Sim
          </Button>
          
      </DialogActions>
    </Dialog>
    </div>
  );
};
export default ConfirmDialog;