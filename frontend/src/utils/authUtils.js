/**
 * Validates if the given email is in a strict format:
 * - Contains '@'
 * - Ends with '.com'
 * - Has valid characters before and after '@'
 */
export const validateStrictEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
  return emailRegex.test(email);
};

/**
 * Common headers for Auth API requests
 */
export const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
});

/**
 * Standardizes the error message from various response types
 */
export const handleAuthError = async (response) => {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const data = await response.json();
    return data.message || 'Identity verification failed';
  } else {
    const text = await response.text();
    return text || 'Server responded with invalid format.';
  }
};
