import React from 'react'
import { Link } from 'react-router-dom';
import {Toolbar, Typography, AppBar, Button } from '@material-ui/core';
import useStyles from '../../styles/Navstyle';
const Navbar = () => {
    const classes = useStyles;
    const e = false
  return (
    <>
        <AppBar position='fixed'  className={classes.appBar}>
            <Toolbar>
                <Typography variant='h6' color='inherit' className={classes.title}>
                    Money Manager
                </Typography>
                <div className={classes.grow} />
                <div className={classes.button}>
                    {e ? (
                                     <Button color='inherit' component={Link} to="/login" >
                                     Login
                                     </Button>
                                    ) : (
                                        <Button color='inherit' component={Link} to="/login">
                                        logout
                                      </Button>
                    )}

                </div>
            </Toolbar>
        </AppBar>
    </>
  )
}
 
export default Navbar