import { ThemeProvider } from '@emotion/react';
import { Box, Button, createTheme, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
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
  const [password, setPassword] = useState<string | undefined>();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
  };

  const handleAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
  };

  const handleTelephoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
  };

  const handleSave = () => {
    //const updatedUser = { ...user, name, email };
    // call backend API to update user
    onClose();
  };

  return (
    <ThemeProvider theme={mdTheme}>
        <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
        <DialogTitle sx={{backgroundColor: mdTheme.palette.primary.light, color: mdTheme.palette.common.white}}>编辑用户</DialogTitle>
        <DialogContent style={{height: '400px'}}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between" sx={{margin: 2}}>
        <TextField label="姓名" value={name} onChange={handleNameChange} style={{width: '100%', marginBottom: '20px'}} />
        <TextField label="账户" value={account} onChange={handleAccountChange} style={{width: '100%', marginBottom: '20px'}} />
        <TextField label="电话" value={telephone} onChange={handleTelephoneChange} style={{width: '100%', marginBottom: '20px'}} />
        <TextField label="密码" value={password} onChange={handlePasswordChange} style={{width: '100%', marginBottom: '20px'}} />
        </Box>
        </DialogContent>
        <DialogActions>
        <Button onClick={onClose} variant='outlined'>取消</Button>
        <Button onClick={handleSave} variant='outlined'>保存</Button>
        </DialogActions>
        </Dialog>
    </ThemeProvider>
  );
};

export default EditUserDialog;
