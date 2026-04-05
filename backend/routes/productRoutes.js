import express from 'express';
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- PUBLIC ROUTES ---
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

// --- ADMIN PROTECTED ROUTES ---
router.route('/')
  .post(protect, admin, createProduct);

router.route('/:id')
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
