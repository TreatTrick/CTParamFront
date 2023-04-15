import React, { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import EditUserDialog from "./editUser";
import PasswordChangeDialog from "./passwordChanging";

type UserInfo = {
    userName: string;
    nickName: string;
    telephone: string;
    avatarUrl: string;
    is_admin: boolean;
};

const initialUserInfo: UserInfo = {
    userName: "John Doe",
    nickName: "JD",
    telephone: "123432343",
    avatarUrl: "",
    is_admin: false,
};

const Account: React.FC = () => {
    const [userInfo, setUserInfo] = useState(initialUserInfo);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

    const handleLogout = () => {
        console.log("Logout");
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    const handlePasswordDialogClose = () => {
        setPasswordDialogOpen(false);
    };

    const handleEdit = () => {
        // Save edited user information
        setEditDialogOpen(false);
    };

    const handleChangePassword = () => {
        // Save new password
        setPasswordDialogOpen(false);
    };

    return (
        <Box>
            <Card>
                <CardContent>
                    <Typography variant="h5">个人信息</Typography>
                    <Box display="flex" alignItems="center" mt={2}>
                        <Avatar src={userInfo.avatarUrl} />
                        <Box ml={2}>
                            <Typography>用户名: {userInfo.userName}</Typography>
                            <Typography>昵称: {userInfo.nickName}</Typography>
                            <Typography>电话: {userInfo.telephone}</Typography>
                            <Typography>是否管理员: {userInfo.is_admin ? "是" : "否"}</Typography>
                        </Box>
                        <IconButton onClick={handleLogout} sx={{ml:10}}>
                            <LogoutIcon />
                            <Typography>退出</Typography>
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>
            <Card sx={{ mt: 2 }}>
                <CardContent>
                    <Typography variant="h5">设置</Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => setEditDialogOpen(true)} variant="outlined">
                        账户编辑
                    </Button>
                    <Button onClick={() => setPasswordDialogOpen(true)} variant="outlined">
                        修改密码
                    </Button>
                </CardActions>
            </Card>
            <PasswordChangeDialog open={passwordDialogOpen} onClose={()=>{setPasswordDialogOpen(false)}}></PasswordChangeDialog>            
        </Box>
    );
};

export default Account;

