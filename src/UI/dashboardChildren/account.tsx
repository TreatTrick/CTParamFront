import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Box, Typography, Paper, Tabs, Tab } from '@mui/material';

const AccountSettings = () => {
  const [username, setUsername] = useState('');
  const [account, setAccount] = useState('');
  const [telephone, setTelephone] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    setUsername('defaultUsername');
    setAccount('defaultAccount');
    setTelephone('defaultTelephone');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, account, telephone });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New password and confirmation password do not match.');
      return;
    }

    console.log({ currentPassword, newPassword });
  };

  const isDisabled = username === '' || account === '';

  return (
    <Container maxWidth="sm">
      <Paper>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="修改账户" />
          <Tab label="修改密码" />
        </Tabs>
      </Paper>
      <Paper sx={{padding:3, mt:2}}>
      {tabValue === 0 && (
          <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="名称"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              error={username === ''}
              helperText={username === '' ? '用户名不能为空' : ''}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="账号"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              required
              error={account === ''}
              helperText={account === '' ? '账户不能为空' : ''}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="电话"
              value={account}
              onChange={(e) => setTelephone(e.target.value)}
            />
          </Box>
          <Button variant="contained" color="primary" type="submit" disabled={isDisabled}>
            确定
          </Button>
        </form>  
      )}
      {tabValue === 1 && (
        <form onSubmit={handlePasswordSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="当前密码"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="新密码"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="确认密码"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Box>
        <Button variant="contained" color="primary" type="submit">
          确定
        </Button>
      </form>
      )}
      </Paper>
    </Container>
      );
};

export default AccountSettings;
