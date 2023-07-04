import PostMessage from "../models/uploadPdf.js";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import User from '../models/user.js'

dotenv.config();

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASS
    },
});

export const getPosts = async (req,res) => {
    try{

        const {id, search} = req.params;
        console.log(req.params);
        let post;
        
        if(search === "2.36"){
           post = await PostMessage.find();
        } else {
           post = await PostMessage.find({ title: { $regex: search,$options: 'i'}})
        }
        return res.status(200).json(post);
    } catch (error){
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req,res) => {
    console.log(1);
    const {id} = req.params;
    console.log(id);
    try{
        
        const post = await PostMessage.findById(id);
        //console.log(post);
        res.status(200).json(post);
    } catch (error){
        res.status(404).json({ message: error });
    }
}


export const createPost = async (req,res) => {
    const post = req.body;
    
    const newPost = new PostMessage({...post, userId: req.userId, createdAt: new Date().toISOString()});
    
    try{
       await newPost.save();

        res.status(201).send(newPost);
    } catch (error){
        res.status(409).send({message: error.message});
    }
}

export const commentPost = async (req,res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true});

   return res.status(200).json(updatedPost);
}

export const deletePost = async (req,res) => {
    const { id } = req.params;
   
    if(!mongoose.Types.ObjectId.isValid(id))return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);

    res.json({ message : 'Post deleted successfully' });
}

export const sharePost = async (req, res) => {
    try {
      const fileId = req.params.fileId;
      const file = await PostMessage.findById({_id: fileId});
    
      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }
  
      const fileUrl = `https://pdf-front.onrender.com/posts/get/${file._id}`;

      const post = await User.findOne({userId: file.userId});
      
      const mailOptions = {
        from: process.env.MAIL,
        to: post.email,
        subject: 'Hello, your share link',
        text:  `Your share link is ${fileUrl}`,
      };
      
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
  
      res.json({ success: true, fileUrl });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
