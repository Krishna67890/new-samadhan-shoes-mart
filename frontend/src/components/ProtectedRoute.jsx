import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-8"></div>
      <p className="text-slate-400 font-black tracking-[0.5em] uppercase text-[10px]">Verifying Credentials...</p>
    </div>
  );

  if (!user) {
    // Save intended destination for post-login redirect
    sessionStorage.setItem('redirectAfterLogin', location.pathname);
    return <Navigate to="/login" replace />;
  }

  // FORCE IDENTITY VERIFICATION FOR GUESTS/USERS (Excluding Admins)
  if (user.role !== 'admin' && !user.identityVerified && location.pathname !== '/identity') {
    return <Navigate to="/identity" replace />;
  }

  return children;
};

export default ProtectedRoute;
