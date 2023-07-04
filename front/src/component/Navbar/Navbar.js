import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { AppBar, Avatar, Button, Toolbar, Typography} from '@material-ui/core';
import memories from '../../static/memories.png'
import { useDispatch } from 'react-redux';
import { useNavigate  } from 'react-router-dom';
import decode from 'jwt-decode'
import { useLocation } from 'react-router-dom';
import { createTheme } from '@material-ui/core';

import useStyles from './styles'
const Navbar = () => {
  const classes = useStyles();
  const[user ,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const theme = createTheme();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    navigate('/');

    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;

    // JWT
    if(token) {
      const decodeToken = decode(token);

      if(decodeToken.exp * 1000 < new Date().getTime()){
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  },[location])

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
    <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h6" align="center" >CoDocs</Typography>
        <img className={classes.image} src ={memories} alt="memories" height="40" />
    </div>
    <Toolbar className={classes.toolbar}>
        {
          user ? (
              <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                  {user.result.name.charAt(0)}
                </Avatar>
                <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Log out</Button>              
              </div>
          ) : (
              <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
          )
        }
    </Toolbar>
    </AppBar>
  )
}

export default Navbar