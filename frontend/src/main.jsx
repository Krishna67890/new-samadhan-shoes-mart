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
      /* Ensure crisp inputs without blur and fix backdrop-filter issues */
      input, textarea, select, .admin-container, .no-blur-zone, .login-portal-container {
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        filter: none !important;
        background-color: rgba(255, 255, 255, 1) !important;
      }

      .dark input, .dark textarea, .dark select, .dark .login-portal-container {
        background-color: rgba(10, 10, 10, 1) !important;
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

      /* Attractive RGB Text Animation - Enhanced */
      @keyframes rgb-brand-glow {
        0% { color: #ff0000; text-shadow: 0 0 8px rgba(255,0,0,0.6); }
        20% { color: #ffff00; text-shadow: 0 0 8px rgba(255,255,0,0.6); }
        40% { color: #00ff00; text-shadow: 0 0 8px rgba(0,255,0,0.6); }
        60% { color: #00ffff; text-shadow: 0 0 8px rgba(0,255,255,0.6); }
        80% { color: #0000ff; text-shadow: 0 0 8px rgba(0,0,255,0.6); }
        100% { color: #ff00ff; text-shadow: 0 0 8px rgba(255,0,255,0.6); }
      }

      .animate-rgb-text {
        animation: rgb-brand-glow 3s infinite linear;
        font-weight: 950;
        filter: drop-shadow(0 2px 2px rgba(0,0,0,0.1)) brightness(1.1);
        letter-spacing: -0.02em;
        -webkit-text-stroke: 0.5px rgba(0,0,0,0.05);
        user-select: none;
        will-change: color, text-shadow;
      }

      @media (max-width: 768px) {
        .animate-rgb-text {
          text-shadow: none !important;
          animation-duration: 5s;
        }
      }

      .dark .animate-rgb-text {
        filter: drop-shadow(0 0 8px rgba(255,255,255,0.1)) brightness(1.3);
        -webkit-text-stroke: 0px;
        color: #ffffff;
      }

      /* Navbar Interaction Buttons Visibility Fix - Higher Contrast */
      .nav-btn-glow {
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        border: 1.5px solid rgba(0,0,0,0.1);
        background: rgba(255,255,255,0.9);
        color: #000000 !important;
        backdrop-filter: blur(8px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .dark .nav-btn-glow {
        box-shadow: 0 4px 12px rgba(255,255,255,0.05);
        border: 1.5px solid rgba(255,255,255,0.2);
        background: rgba(20,20,20,0.8);
        color: #ffffff !important;
      }
      .nav-btn-glow:hover {
        transform: translateY(-2px);
        border-color: #d4af37;
        background: #ffffff;
      }
      .dark .nav-btn-glow:hover {
        background: #000000;
        border-color: #d4af37;
      }

      /* Performance Optimization for long lists */
      .product-scroll-card {
        content-visibility: auto;
        contain-intrinsic-size: 400px;
      }

      /* Floating Animation for Hero Shoe */
      @keyframes float-slow {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(2deg); }
      }
      .animate-float-slow {
        animation: float-slow 6s ease-in-out infinite;
      }

      /* Perspective for 3D Viewer */
      .perspective-1500 {
        perspective: 1500px;
      }
      .preserve-3d {
        transform-style: preserve-3d;
      }
      .backface-hidden {
        backface-visibility: hidden;
      }

      /* Custom Scrollbar for Agent Interfaces - FIXING ACCESSIBILITY */
      .agent-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: #d4af37 rgba(0, 0, 0, 0.05);
      }
      .agent-scrollbar::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      .agent-scrollbar::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.05);
        border-radius: 10px;
      }
      .agent-scrollbar::-webkit-scrollbar-thumb {
        background: #d4af37;
        border-radius: 10px;
      }
      .agent-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #b8962e;
      }

      /* Hide scrollbar but keep functionality */
      .agent-scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .agent-scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      /* Centering Utility */
      .flex-center {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `}</style>


  </React.StrictMode>
);
