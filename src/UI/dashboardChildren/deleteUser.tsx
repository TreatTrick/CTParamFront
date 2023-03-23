import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

interface DeleteUserDialogProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

const mdTheme = createTheme();

const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ open, handleClose, handleDelete }) => {
  return (
<ThemeProvider theme={mdTheme}>
<Dialog
    maxWidth='xs'
    fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" 
      sx={{background: (theme) => theme.palette.primary.light, color: (theme) => theme.palette.common.white}}>删除用户</DialogTitle>
      <DialogContent sx={{margin:5}}>
        <DialogContentText  align='center'>
          是否删除该用户？
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant='outlined'>
          取消
        </Button>
        <Button onClick={handleDelete} color="error" autoFocus variant='outlined'>
          删除
        </Button>
      </DialogActions>
    </Dialog>
</ThemeProvider>
    
  );
};

export default DeleteUserDialog;
