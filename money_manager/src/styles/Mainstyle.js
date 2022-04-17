import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,

  mobile: {
     [theme.breakpoints.down('sm')]: {
      display: 'none',
      },
   }, desktop: {
        [theme.breakpoints.up('sm')]: {
         display: 'none',
  },
  }, grid: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },last: {
      [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(3),
      paddingBottom: '200px',
    },
  }, main: {
      [theme.breakpoints.up('sm')]: {
      paddingBottom: '5%',
    },
  },
}));