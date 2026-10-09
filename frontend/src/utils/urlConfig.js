/**
 * Dynamic URL Configuration for Samadhan Shoes Elite Engine
 */
export const getApiBaseUrl = () => {
  const { hostname, protocol } = window.location;

  // 1. If we are on a known cloud domain, use relative paths or the production URL
  if (hostname.includes('vercel.app') || hostname.includes('render.com')) {
    return import.meta.env.VITE_API_URL || '';
  }

  // 2. FOR ALL LOCAL/NETWORK ENVIRONMENTS:
  // We force Port 5055 to ensure we hit the Backend Engine directly.
  // This bypasses the 405 Method Not Allowed error on the Vite port.
  const targetHost = (hostname === 'localhost' || hostname === '::1' || !hostname) ? '127.0.0.1' : hostname;
  const resolvedUrl = `${protocol}//${targetHost}:5055`;

  return resolvedUrl;
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
