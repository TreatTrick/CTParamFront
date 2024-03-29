import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import Copyright from './copyRight';
import axios from 'axios';
import config from '../functionality/frontend_config.json';
import api from '../functionality/axiosInstance';
import {setLoginUser } from '../functionality/dbTypes';

interface stateDiscription{
  hasError: boolean,
  errorString: string,
}

const theme = createTheme();

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accountState, setAccountState] = useState<stateDiscription>({hasError: false, errorString: ''});
  const [passwordSate, setPasswordState] = useState<stateDiscription>({hasError: false, errorString: ''});
  const navigate = useNavigate();


  const handleLogin = () => {
    if(!username){
      setAccountState({hasError: true, errorString: '账号不能为空'});
    }
    if(!password){
      setPasswordState({hasError: true, errorString: '密码不能为空'});
    }
    if(!username || !password){
        return;
    }
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    api.post(config.login, formData)
    .then((response) => {
        setLoginUser(response.data);
        if(response.data.is_admin === true){
            navigate('/admin/usermanage');
        }
        else{
            navigate('/infofilling');
        }
    })
    .catch((error) => {
      if(error.response.status === 401)
      {
        if(error.response.data.errorCode === 1){
          setAccountState({hasError: true, errorString: '账号不存在'});
        }
        else if(error.response.data.errorCode === 2){  
          setPasswordState({hasError: true, errorString: '密码错误'});
        }
      }
      console.log(error);
      throw new Error(error);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            登录
          </Typography>
          <Box sx={{ mt: 1 }}>
              <TextField
              error={accountState.hasError}
              margin="normal"
              required
              fullWidth
              id="account"
              label="账号"
              value={username}
              autoFocus
              helperText={accountState.errorString}
              onChange={(event) => {
                setAccountState({hasError: false, errorString: ''});
                setUsername(event.target.value);
              }}
            />   
              <TextField
              margin="normal"
              required
              fullWidth
              label="密码"
              type="password"
              id="password"
              value={password}
              error={passwordSate.hasError}
              helperText={passwordSate.errorString}
              onChange={
                (event) => {setPasswordState({hasError: false, errorString: ''});
                setPassword(event.target.value);
              }}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={()=>handleLogin()}
              sx={{ mt: 3, mb: 2 }}
            >
              登录
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  忘记密码?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}