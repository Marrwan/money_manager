import React from 'react';
import useStyles from '../styles/Loginstyle';
import { Grid} from '@material-ui/core';
import SignUp from '../components/Registry/SignUp';
const RegisterPage = () => {
  const classes = useStyles();

  return (
    <div>  
      <Grid className={classes.grid} item xs={12} container spacing={1} alignItems="center" justifyContent="center"  style={{height:'100vh'}}>
      <div className={classes.toolbar} />
        <Grid  item xs={12} sm={4}  className={classes.main} >
            <SignUp />
        </Grid>
      </Grid>
    </div>
  )
}

export default RegisterPage