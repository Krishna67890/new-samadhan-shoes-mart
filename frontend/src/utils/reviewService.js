const STORAGE_KEY = 'newSamadhanProductReviews';

// Broadcast sync across all tabs & browser instances
const broadcastSync = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('reviews_updated'));
    try {
      if ('BroadcastChannel' in window) {
        const channel = new BroadcastChannel('samadhan_reviews_channel');
        channel.postMessage({ type: 'REVIEWS_UPDATED', timestamp: Date.now() });
        channel.close();
      }
    } catch (_) {}
  }
};

export const getReviews = () => {
  try {
    const reviews = localStorage.getItem(STORAGE_KEY);
    return reviews ? JSON.parse(reviews) : [];
  } catch (error) {
    console.error("Error reading reviews from localStorage", error);
    return [];
  }
};

export const getReviewsByProduct = (productId) => {
  const allReviews = getReviews();
  return allReviews.filter(review => String(review.productId) === String(productId));
};

export const saveReview = (reviewData) => {
  const allReviews = getReviews();
  const newReview = {
    ...reviewData,
    id: `rev_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    helpful: 0
  };

  allReviews.push(newReview);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allReviews));
  broadcastSync();
  return newReview;
};

export const deleteReview = (reviewId) => {
  const allReviews = getReviews();
  const filteredReviews = allReviews.filter(review => review.id !== reviewId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredReviews));
  broadcastSync();
};

export const voteHelpful = (reviewId, userId = 'anonymous') => {
  const allReviews = getReviews();
  const reviewIndex = allReviews.findIndex(r => r.id === reviewId);

  if (reviewIndex > -1) {
    const userVotesKey = `helpful_votes_${userId}`;
    const userVotes = JSON.parse(localStorage.getItem(userVotesKey) || '[]');

    if (!userVotes.includes(reviewId)) {
      allReviews[reviewIndex].helpful = (allReviews[reviewIndex].helpful || 0) + 1;
      userVotes.push(reviewId);
      localStorage.setItem(userVotesKey, JSON.stringify(userVotes));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allReviews));
      return true;
    }
  }
  return false;
};

export const calculateProductStats = (productId) => {
  const reviews = getReviewsByProduct(productId);
  const total = reviews.length;

  if (total === 0) {
    return {
      average: 0,
      total: 0,
      breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    };
  }

  const sum = reviews.reduce((acc, rev) => acc + rev.rating, 0);
  const average = (sum / total).toFixed(1);

  const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(rev => {
    const r = Math.round(rev.rating);
    if (breakdown[r] !== undefined) breakdown[r]++;
  });

  // Convert to percentages
  const percentages = {};
  for (let i = 1; i <= 5; i++) {
    percentages[i] = Math.round((breakdown[i] / total) * 100);
  }

  return {
    average: parseFloat(average),
    total,
    breakdown: percentages,
    rawBreakdown: breakdown
  };
};
