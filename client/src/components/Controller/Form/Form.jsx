import React, {useState, useContext, useEffect} from 'react';
import useStyles from '../../../styles/Formstyle';
import {v4 as uuidv4 } from 'uuid';
import { budgetCategories, spendingCategories } from '../../categories';
import { useSpeechContext } from '@speechly/react-client';
import {Button, Grid, MenuItem, Select, Typography, InputLabel, TextField, FormControl} from '@material-ui/core';
import {MoneyManagerContext} from '../../../context/context';
import dateFormat from './dateFormat';
import Notification from '../../Notification/Notification';
const startState = {
    amount: '',
    category: '',
    type: 'Budget',
    date: dateFormat(new Date()),
}

const Form = () => {
    const [open, setOpen] = useState(false);
    const {addPost} = useContext(MoneyManagerContext);
    const [formData, setFormData] = useState(startState);
    const classes = useStyles();
    const selectCat = formData.type === 'Budget' ? budgetCategories : spendingCategories;
    const createPost = () =>{
        if(Number.isNaN(Number(formData.amount))  || !formData.date.includes('-')) return;
        const post= { ...formData, amount: Number(formData.amount), id: uuidv4()}
        if (formData.amount && formData.category && formData.type && formData.date != null) {
          addPost(post);
          setFormData(startState);
          setOpen(true);
        }
    }
    
    const { segment } = useSpeechContext();
    useEffect(() =>{
        if(segment){
        if(segment.intent.intent === 'add_spending')
        {
            setFormData({...formData, type: 'Spending'});
        }
        else if(segment.intent.intent ==='add_budget'){
            setFormData({...formData, type: 'Budget'});
        }
        else if(segment.isFinal && segment.intent.intent === "create_post")
        {
            return createPost();
        }
        else if(segment.isFinal && segment.intent.intent === "cancel_post")
        {
            return  setFormData(startState);
        }
        segment.entities.forEach((s) => {
            const category = `${s.value.charAt(0)}${s.value.slice(1).toLowerCase()}`;
    
            switch (s.type) {
              case 'amount':
                setFormData({ ...formData, amount: s.value });
                break;
              case 'category':
                if (budgetCategories.map((bC) => bC.type).includes(category)) {
                  setFormData({ ...formData, type: 'Budget', category });
                } else if (spendingCategories.map((sC) => sC.type).includes(category)) {
                  setFormData({ ...formData, type: 'Spending', category });
                }
                break;
              case 'date':
                setFormData({ ...formData, date: s.value });
                break;
              default:
                break;
            }
          });
          if (segment.isFinal && formData.amount && formData.category && formData.type && formData.date) {
            createPost();
          }
            }
    }, [segment]); //depedancy array, call function everytime speechly updates
    
    return (
        <Grid container spacing={2}>
          
          <Notification open={open} setOpen={setOpen} message="Post succesfully added!" />
            <Grid item xs={12}>

                <Typography align='center' variant='subtitle2' gutterBottom>
                  {segment ?(
                  <>
                     {segment.words.map((word) => word.value).join(' ')}
                  </>) : null } </Typography> </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Budget or Spending</InputLabel>
                    <Select value={formData.type} onChange={(e) =>setFormData ({ ...formData, type: e.target.value})}>
                      [  <MenuItem value='Budget'>Budget</MenuItem>
                        <MenuItem value='Spending'>Spending</MenuItem>]
                    </Select>
                </FormControl>
                </Grid>

                <Grid item xs={6}>
                <FormControl fullWidth>
                <InputLabel>Categories</InputLabel>
                    <Select value={formData.category} onChange={(e) =>setFormData ({ ...formData, category: e.target.value})}>
                    {selectCat.map((cat)=> <MenuItem key={cat.type} value={cat.type}>{cat.type}</MenuItem>)}
                    </Select>
                </FormControl>
                </Grid>  
                <Grid item xs={6}>
                    <TextField fullWidth type='number' label='Amount' value={formData.amount} onChange={(e) =>setFormData ({ ...formData, amount: e.target.value})}/>
                    </Grid>
                    <Grid item xs={6}>
                    <TextField fullWidth type='date' label='Date' value={formData.date} onChange={(e) =>setFormData ({ ...formData, date: dateFormat(e.target.value)})} />
                    </Grid>
                    <Button className={classes.button} onClick={createPost} color='primary' fullWidth variant='outlined'>Confirm </Button>        
        </Grid>
    )
}

export default Form