import React from 'react';
window.React = React;
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Force clear old guest data if no valid session exists
if (!localStorage.getItem('token')) {
   localStorage.removeItem('userInfo');
   localStorage.removeItem('guest_identity');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
    {/* Visual Clarity System (VCS) */}
    <style>{`
      /* Ensure crisp inputs without blur */
      input, textarea, select, .admin-container, .no-blur-zone {
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        filter: none !important;
      }

      /* Sharp rendering for images */
      img {
        image-rendering: -webkit-optimize-contrast;
      }

      /* High contrast placeholder styling */
      ::placeholder {
        color: #94a3b8 !important;
        opacity: 0.8 !important;
      }
    `}</style>
  </React.StrictMode>
);
