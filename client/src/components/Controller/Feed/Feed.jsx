import React, {useContext, useState} from 'react'
import useStyles from '../../../styles/Feedstyle';
import {MoneyOff, Delete } from '@material-ui/icons';
import {ListItemText, Avatar, ListItemAvatar, List as MUIList, ListItem,IconButton, Slide, ListItemSecondaryAction } from '@material-ui/core';
import {MoneyManagerContext, getPosts} from '../../../context/context';
import Notification from '../../Notification/Notification';

const Feed = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const {deletePost, posts} = useContext(MoneyManagerContext);
    const handleDelete = (id) => {
            setOpen(true)
            deletePost(id)
            getPosts()
            setInterval(() => {
                window.location.reload(false)
              }, 3300);
    }

  return (
    <MUIList className={classes.list} dense={false}>
         <Notification open={open} setOpen={setOpen}  message = "successfully deleted" />
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
                            <IconButton  onClick={() => handleDelete(feed._id)} aria-label='delete' edge='end'>
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