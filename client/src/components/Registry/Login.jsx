import React, {useState} from "react";
import { Container, Typography, Box, TextField} from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from '../../styles/Loginstyle';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import Notification from '../Notification/Notification';


// import useAuth from '../../hooks/useAuth';


const Login = () =>{

  // const {setAuth} = useAuth();
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);
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
        fetch('/login', options)
        .then(data => {
          return data.json()
        })
        .then(async (details) => {
         if(details){
           setSchem(details)
           setOpen(true)
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
            setOpen(true)
          }
          else{
            setSchem({status: 'danger', message: "Login failed"});
            setOpen(true)
          }

        })
      };
     let message = schem.status === 'success' ? 'Login Successful, redirecting ...' : schem.message;
   
  return (
    
      <Container component="main" maxWidth="xs" className={classes.container} >
          <Notification open={open} setOpen={setOpen} message={message} status={schem.status} />
        <Box className={classes.box} textAlign='center'  >
          <br />
         
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