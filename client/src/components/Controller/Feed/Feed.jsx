import React, {useContext, useState} from 'react'
import useStyles from '../../../styles/Feedstyle';
import {MoneyOff, Delete } from '@material-ui/icons';
import {ListItemText, Avatar, ListItemAvatar, List as MUIList, ListItem,IconButton, Slide, ListItemSecondaryAction } from '@material-ui/core';
import {MoneyManagerContext} from '../../../context/context';
import Notification from '../../Notification/Notification';

const Feed = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
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
        setOpen(true)
        const json = await response.json();
        
        if(json.status === 'error'){
            throw Error(json.message)
        }
        setMessage('Post Successfully Deleted')
        setStatus('success')
        window.location.reload(false);
        }
        catch(error){
            
            setMessage(error.message)
            setStatus('error')
            console.log("EError", error.message)
        }
    }
    

  return (
    <MUIList className={classes.list} dense={false}>
           <Notification open={open} setOpen={setOpen} message={message}  status={status}/>
       
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