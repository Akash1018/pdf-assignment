import express from 'express';
import { createPost, getPosts, getPost, deletePost, commentPost, sharePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/look/:id/:search', getPosts);
router.post('/upload',auth, createPost); 
router.delete('/:id',auth, deletePost);
router.get('/get/:id', getPost);
router.post('/:id/comment',auth, commentPost);
router.get('/share/:fileId', sharePost);

export default router;