import React from "react";
import useStyles from '../../styles/Notificationstyle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const Notification = ({open, setOpen}) => {
    const classes = useStyles();
    const handleClose =(event, reason) =>{
        if (reason === 'clickaway') return;
        setOpen(false);
    }
    return (
    <div className={classes.root}>
        <Snackbar anchorOrigin ={{ vertical: 'top', horizontal: 'right'}} open={open} autoHideDuration={3000} onClose={handleClose}> 
            <MuiAlert onClose={handleClose} severity='success' elavation={6} variant='filled'>
                Post succesfully added
            </MuiAlert>
        </Snackbar></div>
  )
}

export default Notification