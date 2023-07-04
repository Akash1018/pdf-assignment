import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
  mainContainer: {
    flexGrow: 1,
  },
  searchContainer: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    background: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },
  searchInput: {
    flexGrow: 1,
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.common.white,
  },
}));