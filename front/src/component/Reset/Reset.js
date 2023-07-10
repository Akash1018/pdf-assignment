import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Grid, Paper, Container, Typography } from '@material-ui/core'
import useStyles from './styles';
import Input from './Input';
import { useDispatch } from 'react-redux'
import { useNavigate  } from 'react-router-dom'
import { resetPassword } from '../../actions/auth';

const Reset = () => {
  const { token } = useParams();
  const classes = useStyles();
  const initialState = {newPassword:'',confirmPassword:''};
  const [formData, setFormData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); //to get console.log() in react.
      dispatch(resetPassword({formData, token}, navigate ));
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h6" align="center">
          Enter new Password
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} >
        <Grid container spacing={2}>
          <Input name="newPassword" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
          <Input name="confirmPassword" label="Confirm Password" type={showPassword ? "text" : "password"} handleChange={handleChange}/>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Confirm</Button>
        </Grid>
        </form>
      </Paper>
      </Container>
  );
};

export default Reset;