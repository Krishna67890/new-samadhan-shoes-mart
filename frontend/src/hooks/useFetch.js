import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, logout } = useAuth();

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true);
      setError(null);

      try {
        // Use relative URL in production to let Vercel handle proxying
        const baseUrl = process.env.NODE_ENV === 'production'
          ? ''
          : 'http://localhost:5000';

        const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;

        const config = {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
        };

        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }

        if (body && !(body instanceof FormData)) {
          config.body = JSON.stringify(body);
        } else if (body instanceof FormData) {
          delete config.headers['Content-Type'];
          config.body = body;
        }

        const response = await fetch(fullUrl, config);

        let data;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          const text = await response.text();
          data = { message: text || response.statusText };
        }

        if (!response.ok) {
          if (response.status === 401) {
            logout();
          }
          throw new Error(data.message || 'Something went wrong');
        }

        setLoading(false);
        return data;
      } catch (err) {
        setLoading(false);
        setError(err.message);
        throw err;
      }
    },
    [user, logout]
  );

  return { loading, error, request };
};

export default useFetch;
