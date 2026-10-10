import { getApiBaseUrl } from './urlConfig';

const STORAGE_KEY = 'newSamadhanProductReviews';

// Helper to notify other components/tabs about updates
const broadcastSync = () => {
  if (typeof window !== 'undefined') {
    // 1. Internal window event for current tab
    window.dispatchEvent(new CustomEvent('reviews_updated'));

    // 2. BroadcastChannel for other tabs
    try {
      if ('BroadcastChannel' in window) {
        const bc = new BroadcastChannel('samadhan_reviews_channel');
        bc.postMessage('sync');
        bc.close();
      }
    } catch (e) {}
  }
};

let lastSyncErrorTime = 0;
const ERROR_THROTTLE_MS = 60000; // 1 minute

// Cross-device server fetcher
export const syncReviewsWithServer = async () => {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/api/reviews`, {
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      const serverReviews = await res.json();
      if (Array.isArray(serverReviews)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(serverReviews));
        broadcastSync();
        return serverReviews;
      }
    }
    throw new Error(`Server responded with ${res.status}`);
  } catch (err) {
    const now = Date.now();
    if (now - lastSyncErrorTime > ERROR_THROTTLE_MS) {
      console.warn('Sync failed; using local cache.', err.message);
      lastSyncErrorTime = now;
    }
    throw err;
  }
};

// Read cached reviews synchronously
export const getReviews = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
    // No seed reviews anymore - start fresh or wait for sync
    return [];
  } catch (error) {
    return [];
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

export const calculateOverallStats = () => {
  const reviews = getReviews();
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
  syncReviewsWithServer().catch(() => {});

  // Sync on window focus (e.g., user returns from another app/tab)
  window.addEventListener('focus', () => {
    syncReviewsWithServer().catch(() => {});
  });

  // Background interval sync every 30 seconds across all devices & browsers
  // Increased from 12s to reduce network load when backend is down
  setInterval(() => {
    syncReviewsWithServer().catch(() => {});
  }, 30000);
}
