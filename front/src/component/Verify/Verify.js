import React, { useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'
import { Paper, Typography, Container, Button } from '@material-ui/core'
import useStyles from './styles';

const Verify = () => {
    const classes = useStyles();
    const history = useNavigate();

    const navigateToHome = () => {
      history('/');
    };
  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Typography variant="h5">Verify your mail to continue</Typography>
            <Typography variant="h6">Check your inbox for verification link</Typography>
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={navigateToHome}
            >
          Go to Home
        </Button>
        </Paper>
    </Container>
  )
}

export default Verify