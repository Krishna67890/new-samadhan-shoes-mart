import express from 'express';
import { getServiceCenters, getServiceCenterById } from '../controllers/serviceCenterController.js';

const router = express.Router();

router.get('/', getServiceCenters);
router.get('/:id', getServiceCenterById);

export default router;
