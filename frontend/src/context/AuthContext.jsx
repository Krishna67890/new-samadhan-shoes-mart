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
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  // Sync state with localStorage whenever user or token changes
  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem('ssm_user_identity', JSON.stringify(user));
        if (token) localStorage.setItem('token', token);
      } catch (e) {
        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
          console.warn("Vault Full: Clearing non-essential data...");
          const identity = localStorage.getItem('ssm_user_identity');
          const currentToken = localStorage.getItem('token');
          localStorage.clear();
          if (identity) localStorage.setItem('ssm_user_identity', identity);
          if (currentToken) localStorage.setItem('token', currentToken);

          try {
            localStorage.setItem('ssm_user_identity', JSON.stringify(user));
          } catch (retryError) {
            console.error("Critical: Storage quota exceeded even after cleanup.");
          }
        }
      }
    } else {
      localStorage.removeItem('ssm_user_identity');
      localStorage.removeItem('token');
    }
  }, [user, token]);

  const login = async (email, password) => {
    setLoading(true);

    // Check for Owner Credentials (Hardcoded as per request)
    if (email.toLowerCase() === 'command@samadhanshoe.com' && password === 'Samadhan_Security_2025_Elite') {
      const ownerData = {
        _id: 'owner_001',
        name: 'Vamanrao Trambak Ahire',
        email: 'Command@SamadhanShoe.com',
        role: 'admin',
        isOwner: true,
        phone: '9423228843',
        secondaryPhone: '8888644021',
        landline: '0253-2629021',
        address: 'Plot No. 29, Santkrupa Niwas, Swami Samarth Nagar, Chhatrapati Sambhaji Nagar Road, Yashwant Lawns Javal, Nandur Naka, Nashik',
        city: 'Nashik',
        state: 'Maharashtra',
        pincode: '422003',
        identityVerified: true,
        avatar: '/New-Samadhan-Shoe-Mart/Main-Shoe.png'
      };

      const secureToken = 'samadhan_elite_admin_secure_token_2025';

      // Crucial: Set storage BEFORE updating state to ensure persistence across potential reloads
      localStorage.setItem('ssm_user_identity', JSON.stringify(ownerData));
      localStorage.setItem('token', secureToken);

      setToken(secureToken);
      setUser(ownerData);
      setLoading(false);
      return { success: true, role: 'admin' };
    }

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
      gender: 'boy',
      identityVerified: false
    };

    const userToken = 'samadhan_user_token_' + Date.now();
    localStorage.setItem('token', userToken);

    setToken(userToken);
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
      state: 'Maharashtra',
      gender: 'boy'
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
      state: 'Maharashtra',
      gender: 'boy'
    };
    setUser(userData);
    setLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
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
      token,
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
