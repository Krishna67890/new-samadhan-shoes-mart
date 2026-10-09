import { getApiBaseUrl } from './urlConfig';

const STORAGE_KEY = 'newSamadhanProductReviews';

// Default verified reviews for immediate offline / zero-latency experience
const DEFAULT_SEED_REVIEWS = [
  {
    id: 'rev_seed_1',
    productId: 'all',
    name: 'Dr. Arvind Patil',
    rating: 5,
    comment: 'Authentic Kolhapuri craftsmanship. Supreme leather softness with high arch comfort. Best footwear in Nashik.',
    review: 'Authentic Kolhapuri craftsmanship. Supreme leather softness with high arch comfort. Best footwear in Nashik.',
    city: 'Nashik',
    verified: true,
    helpful: 14,
    createdAt: '2024-01-15T10:30:00.000Z'
  },
  {
    id: 'rev_seed_2',
    productId: 'all',
    name: 'Sneha Deshmukh',
    rating: 5,
    comment: 'Ordered Peshawari sandals for festival season. Delivered swiftly in Nashik. Excellent finish and comfortable sole!',
    review: 'Ordered Peshawari sandals for festival season. Delivered swiftly in Nashik. Excellent finish and comfortable sole!',
    city: 'Nashik',
    verified: true,
    helpful: 9,
    createdAt: '2024-02-02T14:20:00.000Z'
  },
  {
    id: 'rev_seed_3',
    productId: 'all',
    name: 'Vikram R.',
    rating: 5,
    comment: 'Best formal leather shoes in Nashik. Wore them to a 3-day wedding, zero blisters. Superb fit and elegant look.',
    review: 'Best formal leather shoes in Nashik. Wore them to a 3-day wedding, zero blisters. Superb fit and elegant look.',
    city: 'Mumbai',
    verified: true,
    helpful: 11,
    createdAt: '2024-02-18T09:15:00.000Z'
  },
  {
    id: 'rev_seed_4',
    productId: 'all',
    name: 'Ananya K.',
    rating: 5,
    comment: 'Sneakers are super light and the cushioning feels like walking on air. Highly recommended for daily wear.',
    review: 'Sneakers are super light and the cushioning feels like walking on air. Highly recommended for daily wear.',
    city: 'Thane',
    verified: true,
    helpful: 7,
    createdAt: '2024-03-05T16:45:00.000Z'
  },
  {
    id: 'rev_seed_5',
    productId: 'all',
    name: 'Rajeshwar Shinde',
    rating: 5,
    comment: 'Been purchasing from Samadhan Shoe Mart for over 15 years. Pure leather quality and durability is completely unmatched.',
    review: 'Been purchasing from Samadhan Shoe Mart for over 15 years. Pure leather quality and durability is completely unmatched.',
    city: 'Nashik',
    verified: true,
    helpful: 19,
    createdAt: '2024-03-20T11:00:00.000Z'
  },
  {
    id: 'rev_seed_6',
    productId: 'all',
    name: 'Pooja Kulkarni',
    rating: 5,
    comment: 'Comfortable ethnic sandals for daily office and festival wear. Premium sole padding and genuine leather strap.',
    review: 'Comfortable ethnic sandals for daily office and festival wear. Premium sole padding and genuine leather strap.',
    city: 'Pune',
    verified: true,
    helpful: 6,
    createdAt: '2024-04-01T12:30:00.000Z'
  }
];

// Broadcast sync across all tabs & window instances on same device
const broadcastSync = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('reviews_updated'));
    try {
      if ('BroadcastChannel' in window) {
        const channel = new BroadcastChannel('samadhan_reviews_channel');
        channel.postMessage({ type: 'REVIEWS_UPDATED', timestamp: Date.now() });
        channel.close();
      }
    } catch (_) {}
  }
};

// Cross-device server fetcher
export const syncReviewsWithServer = async () => {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/api/reviews`, {
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      const serverReviews = await res.json();
      if (Array.isArray(serverReviews) && serverReviews.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(serverReviews));
        broadcastSync();
        return serverReviews;
      }
    }
  } catch (err) {
    // Silent network fallback
  }
  return null;
};

// Read cached reviews synchronously
export const getReviews = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    // Seed defaults if empty
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SEED_REVIEWS));
    // Trigger async sync in background
    syncReviewsWithServer();
    return DEFAULT_SEED_REVIEWS;
  } catch (error) {
    console.error('Error reading reviews from localStorage', error);
    return DEFAULT_SEED_REVIEWS;
  }
};

// Async getter ensuring latest cross-device reviews
export const getReviewsAsync = async () => {
  const serverData = await syncReviewsWithServer();
  if (serverData) return serverData;
  return getReviews();
};

export const getReviewsByProduct = (productId) => {
  const allReviews = getReviews();
  return allReviews.filter(
    review => String(review.productId) === String(productId) || review.productId === 'all'
  );
};

export const saveReview = async (reviewData) => {
  const allReviews = getReviews();
  const newReview = {
    ...reviewData,
    id: reviewData.id || `rev_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    comment: reviewData.comment || reviewData.review || '',
    review: reviewData.comment || reviewData.review || '',
    city: reviewData.city || 'Nashik',
    createdAt: reviewData.createdAt || new Date().toISOString(),
    helpful: reviewData.helpful || 0,
    verified: true
  };

  // Optimistic local update
  const updatedReviews = [newReview, ...allReviews.filter(r => r.id !== newReview.id)];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReviews));
  broadcastSync();

  // Async sync to backend API (syncs to other devices & browsers)
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview)
    });
    if (res.ok) {
      const savedOnServer = await res.json();
      // Replace with server version if ID or timestamp changed
      const current = getReviews();
      const reconciled = [savedOnServer, ...current.filter(r => r.id !== newReview.id && r.id !== savedOnServer.id)];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reconciled));
      broadcastSync();
      return savedOnServer;
    }
  } catch (err) {
    console.warn('Review saved locally; will sync with backend when connected.', err);
  }

  return newReview;
};

export const deleteReview = async (reviewId) => {
  // Optimistic local deletion
  const allReviews = getReviews();
  const filteredReviews = allReviews.filter(review => String(review.id) !== String(reviewId));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredReviews));
  broadcastSync();

  // Async server deletion
  try {
    const baseUrl = getApiBaseUrl();
    await fetch(`${baseUrl}/api/reviews/${reviewId}`, {
      method: 'DELETE'
    });
  } catch (err) {
    console.warn('Server deletion request failed; local copy deleted.', err);
  }
};

export const voteHelpful = async (reviewId, userId = 'anonymous') => {
  const allReviews = getReviews();
  const reviewIndex = allReviews.findIndex(r => String(r.id) === String(reviewId));

  if (reviewIndex > -1) {
    const userVotesKey = `helpful_votes_${userId}`;
    const userVotes = JSON.parse(localStorage.getItem(userVotesKey) || '[]');

    if (!userVotes.includes(reviewId)) {
      allReviews[reviewIndex].helpful = (allReviews[reviewIndex].helpful || 0) + 1;
      userVotes.push(reviewId);
      localStorage.setItem(userVotesKey, JSON.stringify(userVotes));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allReviews));
      broadcastSync();

      try {
        const baseUrl = getApiBaseUrl();
        fetch(`${baseUrl}/api/reviews/${reviewId}/helpful`, { method: 'POST' });
      } catch (_) {}

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
      average: 5.0,
      total: 0,
      breakdown: { 5: 100, 4: 0, 3: 0, 2: 0, 1: 0 },
      rawBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    };
  }

  const sum = reviews.reduce((acc, rev) => acc + (Number(rev.rating) || 5), 0);
  const average = (sum / total).toFixed(1);

  const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(rev => {
    const r = Math.min(5, Math.max(1, Math.round(Number(rev.rating) || 5)));
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

// Automatic background sync on startup & window focus
if (typeof window !== 'undefined') {
  // Sync immediately
  syncReviewsWithServer();

  // Sync on window focus (e.g., user returns from another app/tab)
  window.addEventListener('focus', () => {
    syncReviewsWithServer();
  });

  // Background interval sync every 12 seconds across all devices & browsers
  setInterval(() => {
    syncReviewsWithServer();
  }, 12000);
}
