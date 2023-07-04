import { makeStyles } from '@material-ui/core/styles';
import { normalizeUnits } from 'moment';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxHeight: '200px'
    },
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      justifyContent: 'center',
      alignItems: 'center'
    },
  },
  title: {
      fontSize: '2rem',
      fontWeight: '600',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem'
      },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    width: '500px',
    height: '500px',
    [theme.breakpoints.down('sm')]: {
      width: '300px',
      height: '190px',
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
  commentOuterContainer: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
  },
  commentInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
  },
  pdf: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
  },
}));