import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CollectionPage from './pages/CollectionPage';
import ProductDetails from './pages/ProductDetails';
import ShopListing from './pages/ShopListing';
import ShopProfile from './pages/ShopProfile';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import IdentityPage from './pages/IdentityPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import OwnerLoginPage from './pages/OwnerLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminOrders from './pages/AdminOrders';
import AdminProductList from './pages/AdminProductList';
import AdminProductEdit from './pages/AdminProductEdit';
import AdminGalleryManager from './pages/AdminGalleryManager';
import AdminReviewDashboard from './pages/AdminReviewDashboard';
import CheckoutPage from './pages/CheckoutPage';
import ServiceCentrePage from './pages/ServiceCentrePage';
import WorkshopPage from './pages/WorkshopPage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import PageWrapper from './components/PageWrapper';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import { useAuth } from './context/AuthContext';
import AIGuide from './components/AIGuide';
import CustomCursor from './components/CustomCursor';
import WhatsAppConcierge from './components/WhatsAppConcierge';
import TopBanner from './components/TopBanner';
import PageTransition from './components/PageTransition';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const { user } = useAuth();

  useEffect(() => {
    // Session Security: Ensure a fresh session flag exists
    if (user && !sessionStorage.getItem('session_active')) {
      sessionStorage.setItem('session_active', 'true');
    }
  }, [user]);

  return (
    <ThemeProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <TopBanner />
        <Navbar />
        <AIGuide />
        <main className="min-h-screen">
          <PageTransition>
            {(location) => (
              <Routes location={location}>
                {/* Public Routes */}
                <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
                <Route path="/collection" element={<PageWrapper><CollectionPage /></PageWrapper>} />
                <Route path="/products" element={<PageWrapper><ProductsPage /></PageWrapper>} />
                <Route path="/shop" element={<PageWrapper><ShopListing /></PageWrapper>} />
                <Route path="/shop/:id" element={<PageWrapper><ShopProfile /></PageWrapper>} />
                <Route path="/product/:id" element={<PageWrapper><ProductDetails /></PageWrapper>} />
                <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
                <Route path="/register" element={<PageWrapper><LoginPage initialMode="register" /></PageWrapper>} />
                <Route path="/owner-login" element={<PageWrapper><OwnerLoginPage /></PageWrapper>} />
                <Route path="/identity" element={<ProtectedRoute><PageWrapper><IdentityPage /></PageWrapper></ProtectedRoute>} />
                <Route path="/service-centre" element={<PageWrapper><ServiceCentrePage /></PageWrapper>} />
                <Route path="/service" element={<Navigate to="/service-centre" replace />} />
                <Route path="/workshop" element={<PageWrapper><WorkshopPage /></PageWrapper>} />
                <Route path="/atelier" element={<Navigate to="/workshop" replace />} />
                <Route path="/gallery" element={<PageWrapper><GalleryPage /></PageWrapper>} />
                <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />

                {/* User Protected Routes */}
                <Route path="/cart" element={<ProtectedRoute><PageWrapper><CartPage /></PageWrapper></ProtectedRoute>} />
                <Route path="/vault" element={<Navigate to="/cart" replace />} />
                <Route path="/checkout" element={<ProtectedRoute><PageWrapper><CheckoutPage /></PageWrapper></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><PageWrapper><DashboardPage /></PageWrapper></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><PageWrapper><ProfilePage /></PageWrapper></ProtectedRoute>} />
                <Route path="/edit-profile" element={<ProtectedRoute><PageWrapper><EditProfilePage /></PageWrapper></ProtectedRoute>} />
                <Route path="/my-orders" element={<ProtectedRoute><PageWrapper><DashboardPage /></PageWrapper></ProtectedRoute>} />

                {/* Admin Protected Routes */}
                <Route path="/admin" element={<AdminRoute><PageWrapper><AdminDashboard /></PageWrapper></AdminRoute>} />
                <Route path="/admin/orders" element={<AdminRoute><PageWrapper><AdminOrders /></PageWrapper></AdminRoute>} />
                <Route path="/admin/products" element={<AdminRoute><PageWrapper><AdminProductList /></PageWrapper></AdminRoute>} />
                <Route path="/admin/product/new" element={<AdminRoute><PageWrapper><AdminProductEdit /></PageWrapper></AdminRoute>} />
                <Route path="/admin/product/:id/edit" element={<AdminRoute><PageWrapper><AdminProductEdit /></PageWrapper></AdminRoute>} />
                <Route path="/admin/gallery" element={<AdminRoute><PageWrapper><AdminGalleryManager /></PageWrapper></AdminRoute>} />
                <Route path="/admin/reviews" element={<AdminRoute><PageWrapper><AdminReviewDashboard /></PageWrapper></AdminRoute>} />
              </Routes>
            )}
          </PageTransition>
        </main>
        <WhatsAppConcierge />
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
