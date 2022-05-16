import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {Toolbar, Typography, AppBar, Button } from '@material-ui/core';
import useStyles from '../../styles/Navstyle';
const Navbar = () => {
    const classes = useStyles;
    const navigate = useNavigate();
    const e = false
    const handleLogout = () => {
        sessionStorage.removeItem('token');
        localStorage.setItem('user', "loggedout")
        navigate('/login')
    }
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
                                        <Button color='inherit' onClick={handleLogout}>
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