import express from 'express';
import { getAdminStats, getRecentVisitors } from '../controllers/analyticsController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', protect, admin, getAdminStats);
router.get('/visitors', protect, admin, getRecentVisitors);

export default router;
