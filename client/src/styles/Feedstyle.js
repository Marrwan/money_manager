import { makeStyles } from '@material-ui/core/styles';
import { blue, orange } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  avatarBudget: {
    color: 'white',
    backgroundColor: blue[500],
  },
  avatarSpending: {
    color: 'white',
    backgroundColor: orange[500],
  },
  list: {
    maxHeight: '150px',
    overflow: 'auto',
  },
}));
