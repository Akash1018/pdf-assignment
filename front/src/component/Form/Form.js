import React, { useState, useEffect } from "react";
import { TextField, Button,Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64'
import useStyles from './styles';
import { useDispatch  } from "react-redux";
import { createPost,updatePost } from "../../actions/posts";
import { useSelector } from "react-redux";

const Form = ({currentId, setCurrentId}) => {
    const classes = useStyles();
    const [postData, setPostData] = useState({
        title:'', message: '', selectedFile: '',
    })
    const user = JSON.parse(localStorage.getItem('profile'));

    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)

    const dispatch = useDispatch();

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(postData.selectedFile)
        if(currentId){
            dispatch(updatePost(currentId,{ ...postData, name: user?.result?.name}));
        }else {
            dispatch(createPost({ ...postData, name: user?.result?.name}));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({
            title:'', message: '', selectedFile: '',
        })
    }

    if(!user?.result?.name) {
        return (
            <Paper className= {classes.paper}>
                <Typography variant="h6" align="center">
                Sign up now to create your account and effortlessly upload your documents. Take control of your files and unlock seamless document management and organization.
                </Typography>
            </Paper>
        )
    }
    //spread operator needed so that data isn't overwrite and it will change only for the specific property. 
    return (
        <Paper className= {classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">
                    Upload Your PDF
                </Typography>
                <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <div className={classes.fileInput}>
                   <FileBase type="file" multiple= {false} onDone={({base64}) => setPostData({...postData, selectedFile:base64 }) } accept=".pdf"
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>

        </Paper>   
    )
}

export default Form;