// AddUserDialog.tsx
import React, { useState } from 'react';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    TextField,
    createTheme,
} from '@mui/material';
import { User } from '../../functionality/dbTypes';
import api from '../../functionality/axiosInstance';
import config from '../../functionality/frontend_config.json';

const mdTheme = createTheme();

interface AddUserDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (user: User) => void;
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({ open, onClose, onSubmit }) => {
    const [userName, setUserName] = useState('');
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [telephone, setTelephone] = useState('');
    const [isUserNameError, setIsUserNameError] = useState(false);
    const [userNameError, setUserNameError] = useState('');

    const handleSubmit = () => {
        if(userName === '') {
            setIsUserNameError(true);
            setUserNameError('用户名不能为空');
            return;
        }
        onSubmit({ user_name: userName, nick_name: nickName, is_admin: isAdmin, password: password, telephone: telephone });
        setUserName('');
        setNickName('');
        setIsAdmin(false);
        setTelephone('');
        onClose();
    };

    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        api.get(config.is_user_exist, {params:{user_name: event.target.value}})
        .then((res) => {
            setIsUserNameError(true);
            setUserNameError('用户名已存在');
        })
        .catch((err) => {
            setIsUserNameError(false);
        });
        setUserName(event.target.value);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{backgroundColor: mdTheme.palette.primary.light, color: mdTheme.palette.common.white}}>新增用户</DialogTitle>
            <DialogContent>
                <DialogContentText>请填写以下信息</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="用户名"
                    required
                    type="text"
                    fullWidth
                    value={userName}
                    error={isUserNameError}
                    helperText={isUserNameError ? userNameError : ''}
                    onChange={(e) => handleUserNameChange(e)}
                />
                <TextField
                    margin="dense"
                    label="昵称"
                    type="text"
                    fullWidth
                    value={nickName}
                    onChange={(e) => setNickName(e.target.value)}
                />
                <TextField 
                    margin="dense"
                    label="密码" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    type='password'
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="电话号码"
                    type="text"
                    fullWidth
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                    }
                    label="是否是管理员"
                />

            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={onClose}>取消</Button>
                <Button variant='outlined' onClick={handleSubmit}>确认</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddUserDialog;
