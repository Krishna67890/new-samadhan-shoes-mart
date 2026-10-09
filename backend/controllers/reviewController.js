import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REVIEWS_FILE = path.join(__dirname, '..', 'data', 'reviews_store.json');

// Helper to safely read reviews from persistent disk vault
const readReviewsFromFile = () => {
  try {
    if (fs.existsSync(REVIEWS_FILE)) {
      const data = fs.readFileSync(REVIEWS_FILE, 'utf-8');
      return JSON.parse(data || '[]');
    }
  } catch (err) {
    console.error('⚠️ [Review Store] Error reading reviews from disk:', err.message);
  }
  return [];
};

// Helper to safely write reviews to persistent disk vault
const writeReviewsToFile = (reviews) => {
  try {
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('❌ [Review Store] Error saving reviews to disk:', err.message);
    return false;
  }
};

// @desc    Get all reviews (for home page & admin review dashboard)
// @route   GET /api/reviews
// @access  Public
export const getAllReviews = async (req, res) => {
  try {
    const reviews = readReviewsFromFile();
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
};

// @desc    Get reviews for a specific product
// @route   GET /api/reviews/product/:productId
// @access  Public
export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const all = readReviewsFromFile();
    const filtered = all.filter(
      r => String(r.productId) === String(productId) || r.productId === 'all'
    );
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product reviews' });
  }
};

// @desc    Create a new review (from any browser / device)
// @route   POST /api/reviews
// @access  Public
export const createReview = async (req, res) => {
  try {
    const { productId, name, rating, comment, review, city, style, avatar } = req.body;

    if (!name || (!comment && !review)) {
      return res.status(400).json({ message: 'Name and review text are required.' });
    }

    const reviews = readReviewsFromFile();

    const newReview = {
      id: `rev_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      productId: productId || 'all',
      name: name.trim(),
      rating: Number(rating) || 5,
      comment: (comment || review || '').trim(),
      review: (comment || review || '').trim(),
      city: city ? city.trim() : 'Nashik',
      style: style || 'classic',
      avatar: avatar || name.trim().slice(0, 2).toUpperCase(),
      verified: true,
      helpful: 0,
      createdAt: new Date().toISOString()
    };

    // Prepend new review so it appears at top
    reviews.unshift(newReview);
    writeReviewsToFile(reviews);

    console.log(`🌟 [Review Sync] New review submitted by ${newReview.name} (${newReview.city}) - Broadcasted to all devices`);
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Failed to submit review' });
  }
};

// @desc    Delete a review (Owner moderation)
// @route   DELETE /api/reviews/:id
// @access  Public / Owner
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = readReviewsFromFile();
    const updated = reviews.filter(r => String(r.id) !== String(id));

    if (reviews.length === updated.length) {
      return res.status(404).json({ message: 'Review not found' });
    }

    writeReviewsToFile(updated);
    console.log(`🗑️ [Review Sync] Review ${id} removed by Owner across all devices`);
    res.json({ message: 'Review deleted successfully', id });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Failed to delete review' });
  }
};

// @desc    Vote helpful on a review
// @route   POST /api/reviews/:id/helpful
// @access  Public
export const voteHelpfulReview = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = readReviewsFromFile();
    const idx = reviews.findIndex(r => String(r.id) === String(id));

    if (idx === -1) {
      return res.status(404).json({ message: 'Review not found' });
    }

    reviews[idx].helpful = (reviews[idx].helpful || 0) + 1;
    writeReviewsToFile(reviews);
    res.json(reviews[idx]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update review' });
  }
};
