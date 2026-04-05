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
  const { email, password } = req.body;

  // Senior Architect: Predefined Admin Access (No Registration Needed)
  if (email === 'admin@samadhan.com' && password === 'admin123') {
    return res.json({
      _id: 'admin_id_001',
      name: 'System Architect',
      email: 'admin@samadhan.com',
      role: 'admin',
      token: generateToken('admin_id_001'),
    });
  }

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
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
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    // If DB is offline, we still allow admin login above, but normal login fails
    res.status(500).json({ message: 'Identity Vault connection lost. Use Admin/Guest entry.' });
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
