import React from 'react'
import useStyles from '../../styles/Trackerstyle';
import {Card, CardContent, Typography, CardHeader} from '@material-ui/core';
import usePosts from '../usePosts';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Trackers = ({title}) => {
  const {total, chartData} = usePosts(title);
  const classes = useStyles();
  return (
    <Card className={title === 'Budget' ? classes.budget : title === 'Spending' ? classes.spending : classes.null }>
        <CardHeader title={title}/>
        <CardContent>
            <Typography variant="h6"> ${total}</Typography>
             <Pie data={chartData}/> 
        </CardContent>
    </Card>
  )
}

export default Trackers

