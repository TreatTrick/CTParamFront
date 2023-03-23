import { ThemeProvider } from '@emotion/react';
import { Button, createTheme, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';
import {User} from '../../functionality/interactWithBackEnd'

interface EditUserDialogProps {
  user: User;
  open: boolean;
  onClose: () => void;
}

const mdTheme = createTheme();

const EditUserDialog: React.FC<EditUserDialogProps> = ({ user, open, onClose }) => {
  const [name, setName] = useState<string>(user.name);
  const [account, setAccount] = useState<string>(user.account);
  const [telephone, setTelefone] = useState<string | undefined>(user.telephone);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
  };

  const handleSave = () => {
    //const updatedUser = { ...user, name, email };
    // call backend API to update user
    onClose();
  };

  return (
    <ThemeProvider theme={mdTheme}>
        <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
        <TextField label="姓名" value={name} onChange={handleNameChange} />
        <TextField label="账户" value={account} onChange={handleEmailChange} />
        <TextField label="电话" value={telephone} onChange={handleEmailChange} />
        </DialogContent>
        <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
        </DialogActions>
        </Dialog>
    </ThemeProvider>
    
  );
};

export default EditUserDialog;
