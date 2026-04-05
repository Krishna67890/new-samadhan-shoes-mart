import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('ssm_user_identity');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error("Failed to load user from storage:", e);
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  // Sync state with localStorage whenever user changes
  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem('ssm_user_identity', JSON.stringify(user));
      } catch (e) {
        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
          console.warn("Vault Full: Clearing non-essential data...");
          // Try to clear everything EXCEPT the identity to make room
          const identity = localStorage.getItem('ssm_user_identity');
          localStorage.clear();
          if (identity) localStorage.setItem('ssm_user_identity', identity);

          // If it still fails, we might be trying to store a huge avatar
          try {
            localStorage.setItem('ssm_user_identity', JSON.stringify(user));
          } catch (retryError) {
            console.error("Critical: Storage quota exceeded even after cleanup. Identity might be too large (check avatar size).");
          }
        }
      }
    } else {
      localStorage.removeItem('ssm_user_identity');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    const userData = {
      _id: 'user_' + Date.now(),
      name: 'Elite Member',
      email: email,
      role: 'user',
      phone: '',
      address: '',
      city: 'Nashik',
      state: 'Maharashtra',
      pincode: '',
      identityVerified: false
    };

    setUser(userData);
    setLoading(false);
    return { success: true, role: 'user' };
  };

  const loginAsGuest = async () => {
    setLoading(true);
    const guestData = {
      _id: 'guest_' + Date.now(),
      name: 'Elite Guest',
      email: 'guest@samadhan.com',
      role: 'user',
      isGuest: true,
      city: 'Nashik',
      state: 'Maharashtra'
    };

    setUser(guestData);
    setLoading(false);
    return { success: true, role: 'user' };
  };

  const register = async (name, email, password) => {
    setLoading(true);
    const userData = {
      _id: 'user_' + Date.now(),
      name: name,
      email: email,
      role: 'user',
      city: 'Nashik',
      state: 'Maharashtra'
    };
    setUser(userData);
    setLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
    sessionStorage.clear();

    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    window.location.href = '/login';
  };

  const updateProfile = (data) => {
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    return true;
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      loading,
      isAuthenticated: !!user,
      login,
      loginAsGuest,
      register,
      logout,
      updateProfile,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
