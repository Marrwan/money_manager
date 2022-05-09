import React from 'react';
import useStyles from '../styles/Mainstyle';
import Controller from '../components/Controller/Controller';
import Trackers from '../components/Trackers/Trackers';
import { Grid} from '@material-ui/core';
import {ErrorPanel, PushToTalkButtonContainer, PushToTalkButton } from '@speechly/react-ui';
const MainPage = () => {
  const classes = useStyles();
  
  return (
    <div>  
     
      <Grid className={classes.grid} item xs={12} container spacing={1} alignItems="center" justifyContent="center"  style={{height:'100vh'}}>
      <div className={classes.toolbar} />
        <Grid item xs={12} sm={3} className={classes.mobile}>
          <Trackers title="Budget" />
        </Grid>
        
        <Grid  item xs={12} sm={4} className={classes.main}>
          <Controller   />
        </Grid>
        <Grid item xs={12} sm={3} className={classes.desktop}>
          <Trackers title="Budget" />
        </Grid>
        <Grid  item xs={12} sm={3}  className={classes.last}>
          <Trackers title="Spending"  />
        </Grid>
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton />
        <ErrorPanel />
      </PushToTalkButtonContainer>
    </div>
  )
}

export default MainPage