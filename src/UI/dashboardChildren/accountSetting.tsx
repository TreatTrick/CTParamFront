import React, { useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Snackbar,
  Typography,
} from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import EditUserDialog from "./editUser";
import PasswordChangeDialog from "./passwordChanging";
import api from "../../functionality/axiosInstance";
import config from "../../functionality/frontend_config.json";
import { useNavigate } from "react-router";
import { LoginUser, User, setLoginUser } from "../../functionality/dbTypes";

const Account: React.FC = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertColor, setAlertColor] = useState<"success" | "error">("success");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await api.post(config.logout);
      navigate("/auth/login");
    } catch (err: any) {
      setAlertMessage(err.response.data);
    }
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditUserSave = async (user: User) => {
    let formData = new FormData();
    formData.append("id", user.id ? user.id : "");
    formData.append("user_name", user.user_name);
    formData.append("nick_name", user.nick_name ? user.nick_name : "");
    formData.append("telephone", user.telephone ? user.telephone : "");
    formData.append("is_admin", user.is_admin ? "1" : "0");
    try {
      await api.put(config.update_user, formData);
      setEditDialogOpen(false);
      setAlertMessage("修改成功");
      setAlertColor("success");
      setLoginUser(user);
    } catch (error: any) {
      setAlertMessage("修改失败 " + error.response.data.msg);
      setEditDialogOpen(false);
      setAlertColor("error");
    }
    setOpenSnackbar(true);
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h5">个人信息</Typography>
          <Box display="flex" alignItems="center" mt={2}>
            <Avatar />
            <Box ml={2}>
              <Typography>用户名: {LoginUser.user_name}</Typography>
              <Typography>昵称: {LoginUser.nick_name}</Typography>
              <Typography>电话: {LoginUser.telephone}</Typography>
              <Typography>
                是否管理员: {LoginUser.is_admin ? "是" : "否"}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            onClick={handleLogout}
            color="error"
            sx={{ mt: 2 }}
          >
            <LogoutIcon />
            <Typography>退出</Typography>
          </Button>
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
          <Button
            onClick={() => setPasswordDialogOpen(true)}
            variant="outlined"
          >
            修改密码
          </Button>
        </CardActions>
      </Card>
      <EditUserDialog
        isEditSelf={true}
        user={LoginUser}
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        onSave={handleEditUserSave}
      ></EditUserDialog>
      <PasswordChangeDialog
        open={passwordDialogOpen}
        onClose={() => {
          setPasswordDialogOpen(false);
        }}
      ></PasswordChangeDialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={alertColor}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Account;
