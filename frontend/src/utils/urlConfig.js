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

  // If it's already a full URL (http://... or https://...) or a data URI/blob
  if (path.startsWith('http') || path.startsWith('blob:') || path.startsWith('data:')) {
    return path;
  }

  // If it's a relative path from our server (starts with /uploads or uploads)
  const baseUrl = getApiBaseUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  return `${baseUrl}${cleanPath}`;
};
