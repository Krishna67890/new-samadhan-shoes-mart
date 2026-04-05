import express from 'express';
import { getShops, getShopById, createShop, updateShop, deleteShop } from '../controllers/shopController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getShops);
router.get('/:id', getShopById);
router.post('/', protect, admin, createShop);
router.put('/:id', protect, admin, updateShop);
router.delete('/:id', protect, admin, deleteShop);

export default router;
