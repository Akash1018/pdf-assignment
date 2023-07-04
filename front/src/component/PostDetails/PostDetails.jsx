import React, { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react';

import useStyles from './styles';
import { getPost } from '../../actions/posts'
import CommentSection from './CommentSection'

const PostDetails = () => {
  const { post,posts, isLoading} = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useNavigate();
  const classes = useStyles();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log(id);
    dispatch(getPost(id));
  },[id])

  if(!post) return null;

  if(isLoading){
    return (
      <Paper elevation={6} className = {classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    )
  }

  return (
  <Paper style={{ padding: '20px', borderRadius:'15px'}} elevation={6} >
    <div className={classes.card}>
        <div className={classes.section}>
          <Typography className={classes.title}>{post.title}</Typography>
          
            <object
    
              type="application/pdf"
              data={`${post.selectedFile}`}
              width="100%"
              height="600"
              >
              <p>Failed to load PDF file.</p>
              </object>
          <Typography className={classes.message} gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography className={classes.created}>Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post}/>
          <Divider style={{ margin: '20px 0' }} />
        </div>
      </div>
      </Paper>
  )
}

export default PostDetails