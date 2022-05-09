import React, {useContext} from 'react'
import useStyles from '../../styles/Controllerstyle';
import {Grid, Divider, Card, CardContent, Typography, CardHeader} from '@material-ui/core';
import Form from './Form/Form';
import Feed from './Feed/Feed';
import { MoneyManagerContext } from '../../context/context';
import InfoHeading from '../InfoHeading';
const Controller = () => {
    const {currentBalance} = useContext(MoneyManagerContext);
    const classes = useStyles();
  return (
    <Card className={classes.root}>
        <CardHeader title="Budget Controller" subheader="Voice Controller" />
        <CardContent>
            <Typography variant="h6" align='center' > Total Balance ${currentBalance} </Typography>
            <Typography style={{lineHeight: '1.5em', marginTop:'20px'}} variant="subtitle1"> <InfoHeading/> </Typography>
        <Divider />
        <Form />
        </CardContent>
        <CardContent className={classes.cardContent}>
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <Feed />
                </Grid>
            </Grid>
        </CardContent>
     </Card>
  )
}

export default Controller