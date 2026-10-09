import express from 'express';
import {
  getAllReviews,
  getReviewsByProduct,
  createReview,
  deleteReview,
  voteHelpfulReview,
} from '../controllers/reviewController.js';

const router = express.Router();

router.route('/')
  .get(getAllReviews)
  .post(createReview);

router.route('/product/:productId')
  .get(getReviewsByProduct);

router.route('/:id')
  .delete(deleteReview);

router.route('/:id/helpful')
  .post(voteHelpfulReview);

export default router;
