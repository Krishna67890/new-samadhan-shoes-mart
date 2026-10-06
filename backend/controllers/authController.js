import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide identity name, email and security key.' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'This user is already registered in the Vault.' });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      console.log('User created successfully:', user.email);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Register Error Details:', error);
    res.status(500).json({
      message: error.message || 'Server Error during registration',
      stack: process.env.NODE_ENV === 'development' ? error.stack : null
    });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email: inputEmail, password: inputPassword } = req.body;

  // 1. Load and Clean Credentials
  const ownerEmail = (process.env.OWNER_EMAIL || 'Command@SamadhanShoe.com').trim().toLowerCase();
  const ownerPassword = (process.env.OWNER_PASSWORD || 'Samadhan_Security_2025_Elite').trim();

  const email = (inputEmail || '').trim().toLowerCase();
  const password = (inputPassword || '').trim();

  console.log(`🔍 [Auth Attempt] Email: ${email}`);

  // 2. MASTER BYPASS (Checks .env directly)
  if (email === ownerEmail && password === ownerPassword) {
    console.log('🛡️ [Auth] Command Authority detected. Verifying Vault session...');

    try {
      let owner = await User.findOne({ email: ownerEmail });

      if (!owner) {
        owner = await User.create({
          name: 'Store Owner',
          email: ownerEmail,
          password: ownerPassword, // Hashed by model pre-save
          role: 'admin'
        });
        console.log('✅ [Auth] New Owner identity registered in Global Vault.');
      } else {
        // Ensure role is admin if using master credentials
        if (owner.role !== 'admin') {
          owner.role = 'admin';
          await owner.save();
        }
      }

      return res.json({
        _id: owner._id,
        name: owner.name,
        email: owner.email,
        role: owner.role,
        phone: owner.phone || '',
        address: owner.address || '',
        city: owner.city || '',
        pincode: owner.pincode || '',
        token: generateToken(owner._id),
      });
    } catch (dbError) {
      console.warn('⚠️ [Auth] Vault DB Sync failed. Entering Offline Admin mode.');
      return res.json({
        _id: 'offline_admin_001',
        name: 'Store Owner (Offline)',
        email: ownerEmail,
        role: 'admin',
        token: generateToken('offline_admin_001'),
      });
    }
  }

  // 3. REGULAR USER LOGIN (Checks Hashed Passwords in DB)
  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // If this is the owner logging in via DB record (not bypass), ensure they have admin role
      if (email === ownerEmail && user.role !== 'admin') {
        user.role = 'admin';
        await user.save();
      }

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        pincode: user.pincode || '',
        token: generateToken(user._id),
      });
    }

    console.log(`❌ [Auth] Failed: Credentials do not match Vault records for ${email}`);
    res.status(401).json({ message: 'Identity Verification Failed: Invalid email or security key.' });
  } catch (error) {
    console.error('❌ [Auth] Server Error:', error.message);
    res.status(500).json({ message: 'Vault Connection Error. Please try Guest Access.' });
  }
};


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Guest login bypass
// @route   POST /api/auth/guest
// @access  Public
const loginGuest = async (req, res) => {
  try {
    // Architect Note: This bypasses DB connection for immediate "Vault" access
    const guestUser = {
      _id: 'guest_id_007',
      name: 'Elite Guest',
      email: 'guest@samadhan.com',
      role: 'user',
      isGuest: true
    };

    res.json({
      ...guestUser,
      token: generateToken(guestUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Guest access denied' });
  }
};

export { registerUser, loginUser, loginGuest };
