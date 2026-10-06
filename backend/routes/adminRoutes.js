import express from 'express';
import { getAdminStats, getRecentVisitors } from '../controllers/analyticsController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import Product from '../models/productModel.js';
import products from '../data/products.js';
import User from '../models/userModel.js';

const router = express.Router();

router.get('/stats', protect, admin, getAdminStats);
router.get('/visitors', protect, admin, getRecentVisitors);

// EMERGENCY GLOBAL SYNC: Pushes local products to MongoDB Atlas
router.post('/sync-vault', protect, admin, async (req, res) => {
  try {
    await Product.deleteMany();
    const sampleProducts = products.map((product) => {
      return { ...product, user: req.user._id };
    });
    await Product.insertMany(sampleProducts);
    res.json({ message: 'Global Vault Synchronized Successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
