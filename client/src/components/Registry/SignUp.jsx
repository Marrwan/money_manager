import React, {useState} from "react";
import { Container, Typography, Box, TextField} from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from '../../styles/Loginstyle';
import { Link } from 'react-router-dom';
import {Alert} from 'react-bootstrap'
const SignUp = () =>{
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [schem , setSchem] = useState('');
    const credentials = {email, password};
    const options = {
          method: 'POST',
          headers : {
            'Content-Type': 'application/json',
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
       
        fetch('/register', options)
        .then(data => {
          // if(!data.ok){
            //   throw Error(data);
            // }
            return data.json()
          })
          .then(details => {
            console.log(details, "Updated");
            setSchem(details)
          })
          .catch(e => {
            console.log("Error form here" ,e)
          })
        };
        const variant = schem.status === 'success' ? 'success' : 'danger';
        
        const alert =  schem ? <Alert  variant={variant}>{schem.message}</Alert> : null
  return (
    
      <Container component="main" maxWidth="xs" className={classes.container} >
        <Box className={classes.box} textAlign='center'  >
          <br/>
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
              onChange = {(e)=> setPassword(e.target.value) }
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