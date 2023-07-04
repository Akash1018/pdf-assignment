import React, { useState,useEffect } from 'react';
import { Container, Grow, Grid, Paper, Typography, InputBase} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import SearchIcon from '@material-ui/icons/Search';
import Pagination from '../Pagination';
import Navbar from '../Navbar/Navbar';
import { getPosts } from '../../actions/posts'
import useStyles from '../../styles';

const Home = () => {
    const { id } = useParams();
    const [searchData, setSearchData] = useState('')
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch(); 
  console.log(id);
    const handleSearch = (e) => {
      setSearchData(e.target.value);
    }
    useEffect(() => {
      console.log(searchData);
      dispatch(getPosts(id, searchData));
    },[id, searchData])

  return (
    <Grow in>
        <Container>
        <Navbar />
        { id === undefined ? 
        <>
            <Grid className={classes.mainContainer} container justify='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={12} m={6} lg={6} xl={6}>
         
                <Paper className={classes.paper} elevation={3}>
                    <Typography variant="h6" align='center'>Welcome to the PDF Management & Collaboration System! Our web application is specifically designed to streamline the process of managing and collaborating on PDF files. With our platform, you can effortlessly upload, share, and collaborate on your important documents, all in a secure and user-friendly environment.</Typography>
                </Paper>

            </Grid>
            <Grid item xs={12} sm={12} m={6} lg={4} xl={6}>
             <Form currentId={currentId} setCurrentId={setCurrentId}/>
             <Paper elevation={6}>
             </Paper>
            </Grid>
        </Grid></>
        : 
        <Grid className={classes.mainContainer} container justify='space-between' alignItems='stretch' spacing={3}>
                <Grid item xs={12} sm={12} m={6} lg={6} xl={6}>
          <div className={classes.searchContainer} style={{background: 'white',borderRadius: '0.4rem', padding:'0.5rem 0.5rem', marginBottom:'15px'}} >
          <InputBase
            placeholder="Search..."
            className={classes.searchInput}
            onChange={handleSearch}
          />
        </div>
                <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={12} m={6} lg={4} xl={6}>
                 <Form currentId={currentId} setCurrentId={setCurrentId}/>
                 <Paper elevation={6}>
                 </Paper>
                </Grid>
            </Grid>}
        </Container>
    </Grow>
  )
}

export default Home;