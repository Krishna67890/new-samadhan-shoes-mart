/**
 * Dynamic URL Configuration for Samadhan Shoes Elite Engine
 */
export const getApiBaseUrl = () => {
  const { hostname, protocol } = window.location;

  // 1. Check if VITE_API_URL is explicitly set and use it if it's a full URL
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && envUrl.startsWith('http')) {
    return envUrl;
  }

  // 2. Production/Cloud domain check
  if (hostname.includes('vercel.app') || hostname.includes('render.com')) {
    // Return empty for relative paths if rewrites are handled by the platform,
    // otherwise fallback to a hardcoded production URL if available.
    return envUrl || '';
  }

  // 3. FOR ALL LOCAL/NETWORK ENVIRONMENTS:
  // Force Port 5055 to ensure we hit the Backend Engine directly.
  const targetHost = (hostname === 'localhost' || hostname === '::1' || !hostname) ? '127.0.0.1' : hostname;
  return `${protocol}//${targetHost}:5055`;
};

export const resolveImageUrl = (path) => {
  if (!path) return '/Shoes.png';
  if (path.startsWith('blob:') || path.startsWith('data:')) return path;

  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // Direct public folder assets available in frontend/public
  if (
    cleanPath.startsWith('/New-Samadhan-Shoe-Mart/') ||
    cleanPath.startsWith('/Shoes.png') ||
    cleanPath.startsWith('/boy.png') ||
    cleanPath.startsWith('/girl.png') ||
    cleanPath.startsWith('/Front-Banner.jpg') ||
    cleanPath.startsWith('/Devloper.jpg') ||
    cleanPath.startsWith('/favicon.ico') ||
    cleanPath.startsWith('/assets/')
  ) {
    return cleanPath;
  }

  const baseUrl = getApiBaseUrl();

  if (path.startsWith('http')) {
    if (path.includes('localhost:') || path.includes('127.0.0.1:')) {
      return path.replace(/http:\/\/(localhost|127\.0\.0\.1|\[::1\]):[0-9]+/g, baseUrl);
    }
    return path;
  }

  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  return `${normalizedBase}${cleanPath}`;
};
