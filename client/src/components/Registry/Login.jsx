import React, {useState} from "react";
import { Container, Typography, Box, TextField} from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from '../../styles/Loginstyle';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Notification from '../Notification/Notification';
import {getPosts} from '../../context/context'


const Login = () =>{
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [schem, setSchem] = useState();
    const [status, setStatus] = useState('error')
    const navigate = useNavigate();
    const location = useLocation();
    const handleSubmit = (event) => {
      const from = location.state ? location.state.from : { pathname: '/' };
 
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const password = data.get("password");
        const options = {
          method: 'POST',
          headers : {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify({email, password}),
        };
        fetch('/login', options)
        .then(data =>  data.json())
        .then((details) => {
          if(details){
            if(details.hasOwnProperty('status')){
              setStatus(details.status);
              if(details.status === 'error'){
                setOpen(true)
                setSchem(details.message);
              }
            }
            if (details.hasOwnProperty('data')){
              if(details.data.hasOwnProperty('token')){
                const token = details.data.token;
                setOpen(true)
                setSchem('Login success, redirecting ...')
                localStorage.setItem('user', token);
                sessionStorage.setItem('token', token);
                getPosts();
                     setInterval(() => {
             
             navigate(from, { replace: true });
           }, 3300);
              }
            }
           }
      
         })
         .catch(e=>{
           setOpen(true)
           setSchem("Something went wrong");
           console.log(e);
          //  throw new Error(e.message)
         })
      };

  return (
    
      <Container component="main" maxWidth="xs" className={classes.container} >
                 <Notification open={open} setOpen={setOpen} status={status} message={schem} />
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

            <Button type="submit"  fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
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