import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  createTheme,
  Snackbar,
  Alert,
} from '@mui/material';
import api from '../../functionality/axiosInstance';
import config from '../../functionality/frontend_config.json';

interface PasswordChangeDialogProps {
  open: boolean;
  onClose: () => void;
}

const mdTheme = createTheme();

const PasswordChangeDialog: React.FC<PasswordChangeDialogProps> = ({
  open,
  onClose,
}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [alertColor, setAlertColor] = useState<'success' | 'error'>('success');

  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
    if (!e.target.value) {
      setOldPasswordError('请输入旧密码');
    } else {
      setOldPasswordError('');
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    if (!e.target.value) {
      setNewPasswordError('请输入新密码');
    } else {
      setNewPasswordError('');
    }
  };

  const handleConfirmNewPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmNewPassword(e.target.value);
    if (!e.target.value) {
      setConfirmNewPasswordError('请确认新密码');
    } else if (e.target.value !== newPassword) {
      setConfirmNewPasswordError('新旧密码不一致');
    } else {
      setConfirmNewPasswordError('');
    }
  };

  const handleSubmit = async () => {
    let hasError = false;

    if (!oldPassword) {
      setOldPasswordError('请输入旧密码');
      hasError = true;
    } else {
      setOldPasswordError('');
    }

    if (!newPassword) {
      setNewPasswordError('请输入新密码');
      hasError = true;
    } else {
      setNewPasswordError('');
    }

    if (!confirmNewPassword) {
      setConfirmNewPasswordError('请确认新密码');
      hasError = true;
    } else if (newPassword !== confirmNewPassword) {
      setConfirmNewPasswordError('新旧密码不一致');
      hasError = true;
    } else {
      setConfirmNewPasswordError('');
    }

    let passwordChangedSuccessfully = false;
    let errorMsg = '';
    let formData = new FormData();
    formData.append('old_password', oldPassword);
    formData.append('new_password', newPassword);
    try{
      const res = await api.post(config.change_password, formData);
      if (res.status === 200) {
        passwordChangedSuccessfully = true;
      }
    }catch(err: any){
      errorMsg = err.response.data.msg;
      if(err.response.data.errorCode === 2){
        setOldPasswordError(err.response.data.msg);
      }
    }

    if (hasError) {
      return;
    }
    setShowSnackbar(true);
    setSnackbarMessage(passwordChangedSuccessfully ? '密码修改成功！' : `密码修改失败 ${errorMsg}`);
    setAlertColor(passwordChangedSuccessfully ? 'success' : 'error');
    if(passwordChangedSuccessfully){
      onClose();
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle
          sx={{
            backgroundColor: mdTheme.palette.primary.light,
            color: mdTheme.palette.common.white,
          }}
        >
          Password Change
        </DialogTitle>
        <DialogContent>
          <TextField
            label="旧密码"
            type="password"
            fullWidth
            margin="normal"
            required
            value={oldPassword}
            onChange={handleOldPasswordChange}
            error={!!oldPasswordError}
            helperText={oldPasswordError}
          />
          <TextField
            label="新密码"
            type="password"
            fullWidth
            margin="normal"
            required
            value={newPassword}
            onChange={handleNewPasswordChange}
            error={!!newPasswordError}
            helperText={newPasswordError}
          />
          <TextField
            label="确认新密码"
            type="password"
            fullWidth
            margin="normal"
            required
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
            error={!!confirmNewPasswordError}
            helperText={confirmNewPasswordError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            取消
          </Button>
          <Button onClick={handleSubmit} variant="outlined">
            确定
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={showSnackbar} autoHideDuration={4000} onClose={(e, r) => handleCloseSnackbar(e, r)}>
        <Alert onClose={(e) => handleCloseSnackbar(e)} severity={alertColor} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>

  );
};

export default PasswordChangeDialog;