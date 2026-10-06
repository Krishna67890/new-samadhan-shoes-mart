import { getApiBaseUrl } from './urlConfig';

export const getImageUrl = (path) => {
  if (!path) return '/placeholder-shoe.jpg';

  // If it's already a full URL, return it
  if (path.startsWith('http')) return path;

  // Use the dynamic base URL (works for both localhost and mobile devices)
  const baseUrl = getApiBaseUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  return `${baseUrl}${cleanPath}`;
};
