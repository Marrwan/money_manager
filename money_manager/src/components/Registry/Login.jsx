import React from "react";
import { Container, Typography, Box, TextField} from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from '../../styles/Loginstyle';
import { Link } from 'react-router-dom';

const Login = () =>{
    const classes = useStyles();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
      };

  return (
    
      <Container component="main" maxWidth="xs" className={classes.container} >
       
        <Box className={classes.box} textAlign='center'  >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              autoComplete="current-password"
            />

            <Button type="submit"  component={Link} to="/" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
              Sign In
            </Button>
          </Box>
          <Button component={Link} to="/register" fullWidth variant="contained" style={{maxWidth: '90%', maxHeight: '10%'}} sx={{ mt: 3, mb: 2 }} >
              Don't have an account? Register
            </Button>
        </Box>
      </Container>
  );
}

export default Login