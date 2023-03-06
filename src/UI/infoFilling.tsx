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
import { Navigate } from "react-router-dom";

const theme = createTheme();

function MainPage(){

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('account'),
          password: data.get('password'),
        });
        
      };

    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Typography component="h1" variant="h5">
            请填写以下内容
          </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>               
              <TextField
                margin="normal"
                variant='filled'
                required
                fullWidth
                id="param1"
                label="参数1"
                name="param1"
                autoFocus
              />
              <TextField
                margin="normal"
                variant='filled'
                required
                fullWidth
                id="param2"
                label="参数2"
                name="param2"
                autoFocus
              />
              <TextField
                margin="normal"
                variant='filled'
                required
                fullWidth
                id="param3"
                label="参数3"
                name="param3"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                提交
              </Button>
            </Box>
        </Box>
        </Container>
      </ThemeProvider>
    );
}

export default function InfoFilling(){

    const token = localStorage.getItem('token');
    if(token){
        return (
            <MainPage/>
        );
    }
    else{
        return <Navigate to = 'auth/login'/>
    }  
}