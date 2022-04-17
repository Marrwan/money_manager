import React, {useContext} from 'react'
import useStyles from '../../../styles/Feedstyle';
import {MoneyOff, Delete } from '@material-ui/icons';
import {ListItemText, Avatar, ListItemAvatar, List as MUIList, ListItem,IconButton, Slide, ListItemSecondaryAction } from '@material-ui/core';
import {MoneyManagerContext} from '../../../context/context';
const Feed = () => {
    const classes = useStyles();
    const {deletePost, posts} = useContext(MoneyManagerContext);


  return (
    <MUIList className={classes.list} dense={false}>
            {posts.map((feed) =>(
                <Slide key={feed.id} mountOnEnter unmountOnExit direction='down' in>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={feed.type === 'Budget' ? classes.avatarBudget : classes.avatarSpending} >
                                <MoneyOff/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={feed.category} secondary={`$${feed.amount} - ${feed.date} `} />
                        <ListItemSecondaryAction>
                            <IconButton  onClick={() => deletePost(feed.id)} aria-label='delete' edge='end'>
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