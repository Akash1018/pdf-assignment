import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@material-ui/core";
import moment from 'moment';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import pic from '../../../static/pdf.png'
import ShareIcon from '@material-ui/icons/Share';
import { deletePost } from '../../../actions/posts';
import DeleteIcon from '@material-ui/icons/Delete'
import useStyles from './styles';
import { sharePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();

    const openPost = () => navigate(`/posts/get/${post._id}`);

    const Share = () => {
        
        return <><ShareIcon fontSize="small" />&nbsp;Share</>
    }

    const handleShare = () => {
        dispatch(sharePost(post._id));
        
        window.alert('Please check your email for the share link.');
    }
    console.log(user?.result?._id);
    console.log(2);
    console.log(post?.userId);
    return (
        <Card className={classes.card} raised elevation={6}>
                            <CardMedia className={classes.media} image={pic} title={post.title}/>
                <div className={classes.overlay}>
                    <Typography variant = "body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
              
                <Typography className={classes.title} variant = "h5" gutterBottom>{post.title}</Typography>
                <CardContent>
                    <Typography noWrap variant = "body2" color="textSecondary" component="p"  gutterBottom>{post.message}</Typography>
                </CardContent>
           
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleShare} >
                    <Share />
                </Button>
                {user?.result?._id === post?.userId && (
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                )}
                <ButtonBase className={classes.cardAction} onClick={openPost} >Click to view PDF...</ButtonBase>
            </CardActions>
        </Card>
    )
};

export default Post;