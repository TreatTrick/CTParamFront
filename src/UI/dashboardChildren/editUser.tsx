import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Checkbox,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { User } from "../../functionality/dbTypes";
import api from "../../functionality/axiosInstance";
import config from "../../functionality/frontend_config.json";
import { isEditable } from "@testing-library/user-event/dist/utils";

interface EditUserDialogProps {
  user: User;
  open: boolean;
  onSave: (user: User) => Promise<void>;
  onClose: () => void;
  isEditSelf: boolean;
}

const mdTheme = createTheme();

const EditUserDialog: React.FC<EditUserDialogProps> = ({
  user,
  open,
  onSave,
  onClose,
  isEditSelf,
}) => {
  const [editUser, setEditUser] = useState<User>(user);
  const [isUserNameError, setIsUserNameError] = useState(false);
  const [userNameError, setUserNameError] = useState("");

  const handleUserChange = async (prop: keyof User, value: string | boolean) => {
    setEditUser({ ...editUser, [prop]: value });
    if(prop === "user_name") {
      try {
        await api.get(config.is_user_exist, { params: { user_name: value } });
        setIsUserNameError(false);
        setUserNameError("");
      } catch (err) {
        setIsUserNameError(true);
        setUserNameError("用户名已存在");
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      onSave(editUser);
    } else if (event.key === "Escape") {
      onClose();
    }
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xs"
        fullWidth
        onKeyDown={handleKeyDown}
      >
        <DialogTitle
          sx={{
            backgroundColor: mdTheme.palette.primary.light,
            color: mdTheme.palette.common.white,
          }}
        >
          编辑用户
        </DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start" 
            justifyContent="space-between"
            sx={{ margin: 2 }}
          >
            <TextField
              label="用户名"
              error={isUserNameError}
              helperText={userNameError}
              required
              value={editUser.user_name}
              onChange={(e) => handleUserChange("user_name", e.target.value)}
              style={{ width: "100%", marginBottom: "20px" }}
            />
            <TextField
              label="昵称"
              value={editUser.nick_name}
              onChange={(e) => handleUserChange("nick_name", e.target.value)}
              style={{ width: "100%", marginBottom: "20px" }}
            />
            <TextField
              label="电话"
              value={editUser.telephone}
              onChange={(e) => handleUserChange("telephone", e.target.value)}
              style={{ width: "100%", marginBottom: "20px" }}
            />
            {isEditSelf ? null : (
              <TextField
                label="新密码（不输入则保持原密码不变）"
                onChange={(e) => handleUserChange("password", e.target.value)}
                style={{ width: "100%", marginBottom: "20px" }}
              />
            )}
            {isEditSelf ? null : (
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={editUser.is_admin}
                    onChange={(e) => handleUserChange('is_admin',e.target.checked)}
                  />
                }
                label="是否是管理员"
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            取消
          </Button>
          <Button
            onClick={() => (onSave(editUser))}
            variant="outlined"
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default EditUserDialog;
