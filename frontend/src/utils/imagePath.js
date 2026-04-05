export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path; // Already an online URL
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
};
