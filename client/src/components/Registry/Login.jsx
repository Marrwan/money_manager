import React, {useState} from "react";
import { Container, Typography, Box, TextField} from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from '../../styles/Loginstyle';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import {Alert } from 'react-bootstrap';


// import useAuth from '../../hooks/useAuth';


const Login = () =>{

  // const {setAuth} = useAuth();
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [schem , setSchem] = useState('');
    const credentials = {email, password};
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state ? location.state.from : { pathname: '/' };
    const options = {
          method: 'POST',
          headers : {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify(credentials),
        };
    const handleSubmit = (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // console.log({
        //   email: data.get('email'),
        //   password: data.get('password'),
        // });
        
        fetch('/login', options)
        .then(data => {
          // if(!data.ok){
          //   throw Error(data);
          // }
          return data.json()
        })
        .then(async (details) => {
         if(details){
           setSchem(details)
           if (details.hasOwnProperty('data')){
             if(details.data.hasOwnProperty('token')){
               const token = details.data.token;
               sessionStorage.setItem('token', token);
             }
           }
           // setAuth({email,token});
           
          }
        
       
    

          setInterval(() => {
            
            navigate(from, { replace: true });
          }, 2300);
        })
        .catch(e => {
          console.log("E", e);
          if(!e.response){
            setSchem({status: 'danger', message: e.message, info: e});
          }
          else{
            setSchem({status: 'danger', message: "Login failed"});
          }

        })
      };
      const variant = schem.status === 'success' ? 'success' : 'danger';
     let message = schem.status === 'success' ? 'Login Successful, redirecting ...' : schem.message;
        
        const alert =  schem ? <Alert  variant={variant}>{message}</Alert> : null

  return (
    
      <Container component="main" maxWidth="xs" className={classes.container} >
       
        <Box className={classes.box} textAlign='center'  >
          <br />
          {alert}
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
              onChange = {(e)=> setEmail(e.target.value)}
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
              onChange = {(e)=> setPassword(e.target.value)}
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