import express from 'express';
import { forgot, reset, signin, signup, verify } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/verify', verify);
router.post('/forgot-password', forgot);
router.post('/reset-password', reset);

export default router;