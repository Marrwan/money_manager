import React from 'react';
import useStyles from '../styles/Loginstyle';
import { Grid} from '@material-ui/core';
import Login from '../components/Registry/Login';
const LoginPage = () => {
  const classes = useStyles();

  return (
    <div>  
      <Grid className={classes.grid} item xs={12} container spacing={1} alignItems="center" justifyContent="center"  style={{height:'100vh'}}>
      <div className={classes.toolbar} />
        <Grid  item xs={12} sm={4}  className={classes.main} >
            <Login />
        </Grid>
      </Grid>
    </div>
  )
}

export default LoginPage