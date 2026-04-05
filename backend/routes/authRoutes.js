import express from 'express';
import { registerUser, loginUser, loginGuest } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/guest', loginGuest);

export default router;
