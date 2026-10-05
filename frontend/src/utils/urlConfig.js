export const getApiBaseUrl = () => {
  // 1. Check for explicit environment variable (Vercel/Cloud)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // 2. Local/Network Discovery
  // If we are on localhost or a local IP (192.168.x.x), use the current host + port 5000
  const hostname = window.location.hostname;
  const isLocal = hostname === 'localhost' ||
                  hostname === '127.0.0.1' ||
                  hostname.startsWith('192.168.') ||
                  hostname.startsWith('10.') ||
                  hostname.endsWith('.local');

  if (isLocal) {
    return `http://${hostname}:5000`;
  }

  // 3. Fallback for true Production (same host)
  return '';
};

export const resolveImageUrl = (path) => {
  if (!path) return '/placeholder-shoe.jpg';

  const baseUrl = getApiBaseUrl();

  // Handle case where path is already a full URL
  if (path.startsWith('http')) {
    // If the URL contains localhost or 127.0.0.1, it's likely from a local DB entry
    // We need to replace it with the actual dynamic baseUrl so other devices can see it
    if (path.includes('localhost:') || path.includes('127.0.0.1:')) {
      return path.replace(/http:\/\/(localhost|127\.0\.0\.1):5000/g, baseUrl);
    }
    return path;
  }

  // Handle data URIs or blobs
  if (path.startsWith('blob:') || path.startsWith('data:')) {
    return path;
  }

  // If it's a relative path from our server
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};
