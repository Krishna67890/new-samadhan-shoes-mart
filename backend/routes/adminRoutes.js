import express from 'express';
import { getAdminStats, getRecentVisitors } from '../controllers/analyticsController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import Product from '../models/productModel.js';
import products from '../data/products.js';
import User from '../models/userModel.js';

const router = express.Router();

router.get('/stats', protect, admin, getAdminStats);
router.get('/visitors', protect, admin, getRecentVisitors);

// EMERGENCY GLOBAL SYNC: Pushes products to MongoDB Atlas
router.post('/sync-vault', protect, admin, async (req, res) => {
  try {
    const { products: localProducts } = req.body;

    // 1. Clear existing products to prevent duplicates during full sync
    await Product.deleteMany();

    let productsToSync = [];

    if (localProducts && Array.isArray(localProducts) && localProducts.length > 0) {
      // 2a. Use products provided by the owner's dashboard (Elite Sync)
      productsToSync = localProducts.map((product) => {
        // Clean up ID to let MongoDB generate new ones or keep consistent ones
        const { _id, id, purpose, ...rest } = product;
        return {
          ...rest,
          useCases: purpose || [], // Map purpose to useCases for DB compatibility
          user: req.user._id
        };
      });
      console.log(`📦 [Sync] Pushing ${productsToSync.length} owner-defined products to Vault.`);
    } else {
      // 2b. Fallback to default seed products
      productsToSync = products.map((product) => {
        return { ...product, user: req.user._id };
      });
      console.log(`📦 [Sync] Pushing default elite seed to Vault.`);
    }

    await Product.insertMany(productsToSync);
    res.json({ message: 'Global Vault Synchronized Successfully!' });
  } catch (error) {
    console.error('❌ [Sync Error]', error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
