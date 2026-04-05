import React from 'react';
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
      /* DISABLE ALL SYSTEM BLURS */
      * {
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        filter: none !important;
      }

      /* FORCE SHARP RENDERING */
      img {
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
      }

      .no-blur-zone *, .no-blur-zone, .blur-none-forced {
        filter: none !important;
        backdrop-filter: none !important;
      }

      /* HIGH CONTRAST ACCESSIBILITY */
      ::placeholder {
        color: #64748b !important;
        opacity: 1 !important;
        font-weight: 800 !important;
      }
    `}</style>
  </React.StrictMode>
);
