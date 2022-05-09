import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,

   grid: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
 main: {
      [theme.breakpoints.up('sm')]: {
      paddingBottom: '5%',
    },
  },
  container: {
    backgroundColor: 'white'
  },
  box: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }

}));