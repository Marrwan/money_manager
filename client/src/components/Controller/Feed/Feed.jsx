import React, {useContext, useState, useEffect} from 'react'
import useStyles from '../../../styles/Feedstyle';
import {MoneyOff, Delete } from '@material-ui/icons';
import {ListItemText, Avatar, ListItemAvatar, List as MUIList, ListItem,IconButton, Slide, ListItemSecondaryAction } from '@material-ui/core';
import {MoneyManagerContext} from '../../../context/context';
import { Link, useNavigate } from 'react-router-dom';
import {Alert} from 'react-bootstrap'

const Feed = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { posts} = useContext(MoneyManagerContext);
    // const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')
    const deletePost = async(id) => {
        try{
        const options = {
            method: 'DELETE',
            headers : {
              'Content-Type' : 'application/json',
            },
            
          };
        let response = await fetch(`/posts/${id}`, options)
        const json = await response.json();
        
        if(json.status === 'error'){
            throw Error(json.message)
        }
        setMessage('Post Successfully Deleted')
        setStatus('success')
        window.location.reload(false);
        }
        catch(error){
            
            navigate('/')
            setMessage(error.message)
            setStatus('error')
            console.log("EError", error.message)
        }
    }
    // useEffect(async()=>{

    //     fetch('/posts') .then(data => {
    //         return data.json()
    //   })
    //   .then(async (details) => {
    //      setPosts(details.data.posts);
    //     })
    // },[])
    const variant = status === 'error' ? 'danger' : 'success';
        
    const alert =  message ? <Alert  variant={variant}>{message}</Alert> : null

  return (
    <MUIList className={classes.list} dense={false}>
        {alert}
    {message}
            {posts.map((feed) =>(
                <Slide key={feed._id} mountOnEnter unmountOnExit direction='down' in>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={feed.type === 'Budget' ? classes.avatarBudget : classes.avatarSpending} >
                                <MoneyOff/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={feed.category} secondary={`$${feed.amount} - ${feed.date} `} />
                        <ListItemSecondaryAction>
                            <IconButton  onClick={() => deletePost(feed._id)} aria-label='delete' edge='end'>
                                <Delete/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Slide>
            ))}
         </MUIList>
  )
}

export default Feed