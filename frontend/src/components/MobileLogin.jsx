import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';

// CODES FROM https://github.com/mui/material-ui/blob/v5.15.12/docs/data/material/getting-started/templates/sign-in/SignIn.js

const defaultTheme = createTheme();
/**
 * function
 * @return {object} something
 */
export default function SignIn() {
  const [user, setUser] = React.useState({email: '', password: ''});
  const [correct, setCorrect] = React.useState(false);
  const history = useNavigate();

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const u = user;
    u[name] = value;
    setUser(u);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // from book example
    fetch('http://localhost:3010/v0/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          localStorage.setItem('user', JSON.stringify(json));
          setCorrect(false);
          history('/workspace');
        })
        .catch((err) => {
          setCorrect(true);
        });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Email Address"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleInputChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleInputChange}
              autoComplete='current-password'
            />
            <Button
              id ='sign in'
              type='submit'
              fullWidth
              variant='contained'
              sx={{mt: 3, mb: 2}}
            >
              Sign In
            </Button>
            <Typography style={{
              visibility: correct ? 'visible' : 'hidden',
              color: 'red',
            }}>
              Incorrect Email or Password
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
