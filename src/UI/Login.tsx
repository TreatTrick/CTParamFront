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

interface stateDiscription{
  hasError: boolean,
  errorString: string,
}

const theme = createTheme();

export default function SignIn() {
  const [accountState, setAccountState] = useState<stateDiscription>({hasError: false, errorString: ''});
  const [passwordSate, setPasswordState] = useState<stateDiscription>({hasError: false, errorString: ''});
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('account'),
      password: data.get('password'),
    });
    let email = data.get('account');
    let password = data.get('password');
    if(!email){
      setAccountState({hasError: true, errorString: '账号不能为空'});
    }
    if(!password){
      setPasswordState({hasError: true, errorString: '密码不能为空'});
    }
    if(!email || !password){
        return;
    }
    localStorage.setItem('token', '233456');
    navigate('/');
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
              error={accountState.hasError}
              margin="normal"
              required
              fullWidth
              id="account"
              label="账号"
              name="account"
              autoComplete="account"
              autoFocus
              helperText={accountState.errorString}
              onChange={() => setAccountState({hasError: false, errorString: ''})}
            />   
              <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="密码"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordSate.hasError}
              helperText={passwordSate.errorString}
              onChange={() => setPasswordState({hasError: false, errorString: ''})}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
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