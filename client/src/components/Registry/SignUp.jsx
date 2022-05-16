import React, {useState} from "react";
import { Container, Typography, Box, TextField} from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from '../../styles/Loginstyle';
import {  Link, useNavigate} from 'react-router-dom';
import Notification from '../Notification/Notification';

const SignUp = () =>{
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [schem, setSchem] = useState();
    const [status, setStatus] = useState('error')
    const navigate = useNavigate();
    const handleSubmit = (event) => {
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
        
        fetch('/register', options)
        .then(data =>  data.json())
        .then((details) => {
          if(details){
            if(details.hasOwnProperty('status')){
              setStatus(details.status);
              if(details.status === 'error'){
                throw new Error(details.message)
              }
            }
            setOpen(true)
            setSchem(details.message)
            // setInterval(() => {
             
            //   navigate("/login");
            // }, 3300);
           }
         })
         .catch(e=>{
           setOpen(true)
           setSchem(e.message);
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

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                Register
            </Button>

          </Box>
          <Button component={Link} to="/login" fullWidth variant="contained" style={{maxWidth: '90%', maxHeight: '10%'}} sx={{ mt: 3, mb: 2 }} >
              Already have an account? Login
            </Button>
        </Box>
      </Container>
  );
}

export default SignUp