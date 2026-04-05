import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetails from './pages/ProductDetails';
import ShopListing from './pages/ShopListing';
import ShopProfile from './pages/ShopProfile';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import IdentityPage from './pages/IdentityPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import CheckoutPage from './pages/CheckoutPage';
import ServiceCentrePage from './pages/ServiceCentrePage';
import PageWrapper from './components/PageWrapper';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import { useAuth } from './context/AuthContext';
import AIGuide from './components/AIGuide';

function App() {
  const { user } = useAuth();

  useEffect(() => {
    // Session Security: Ensure a fresh session flag exists
    if (user && !sessionStorage.getItem('session_active')) {
      sessionStorage.setItem('session_active', 'true');
    }
  }, [user]);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navbar />
      <AIGuide />
      <main className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
          <Route path="/products" element={<PageWrapper><ProductsPage /></PageWrapper>} />
          <Route path="/shop" element={<PageWrapper><ShopListing /></PageWrapper>} />
          <Route path="/shop/:id" element={<PageWrapper><ShopProfile /></PageWrapper>} />
          <Route path="/product/:id" element={<ProtectedRoute><PageWrapper><ProductDetails /></PageWrapper></ProtectedRoute>} />
          <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
          <Route path="/identity" element={<ProtectedRoute><PageWrapper><IdentityPage /></PageWrapper></ProtectedRoute>} />
          <Route path="/service-centre" element={<PageWrapper><ServiceCentrePage /></PageWrapper>} />
          <Route path="/service" element={<Navigate to="/service-centre" replace />} />

          {/* User Protected Routes */}
          <Route path="/cart" element={<ProtectedRoute><PageWrapper><CartPage /></PageWrapper></ProtectedRoute>} />
          <Route path="/vault" element={<Navigate to="/cart" replace />} />
          <Route path="/checkout" element={<ProtectedRoute><PageWrapper><CheckoutPage /></PageWrapper></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><PageWrapper><DashboardPage /></PageWrapper></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><PageWrapper><ProfilePage /></PageWrapper></ProtectedRoute>} />
          <Route path="/edit-profile" element={<ProtectedRoute><PageWrapper><EditProfilePage /></PageWrapper></ProtectedRoute>} />
          <Route path="/my-orders" element={<ProtectedRoute><PageWrapper><DashboardPage /></PageWrapper></ProtectedRoute>} />

          {/* Admin Protected Routes */}
          <Route path="/admin/*" element={<AdminRoute><PageWrapper><AdminDashboard /></PageWrapper></AdminRoute>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
