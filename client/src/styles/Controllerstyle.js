import { makeStyles } from '@material-ui/core/styles';



export default makeStyles((theme) => ({
   
    divider: {
        margin: '20px 0',
      },
      
      
      media: {
    height: 0,
    paddingTop: '56.25%', 
  }, 
  
  
  cartContent: {
    paddingTop: 0,
  },


  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },


  expandOpen: {
    transform: 'rotate(180deg)',
  },



}));