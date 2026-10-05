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

  // Predefined Admin Access from .env OR Default
  const ownerEmail = process.env.OWNER_EMAIL || 'Command@SamadhanShoe.com';
  const ownerPassword = process.env.OWNER_PASSWORD || 'Samadhan_Security_2025_Elite';

  if (email === ownerEmail && password === ownerPassword) {
    try {
      // ENSURE OWNER EXISTS IN DATABASE for global sync capability
      let owner = await User.findOne({ email: ownerEmail });

      if (!owner) {
        owner = await User.create({
          name: 'Store Owner',
          email: ownerEmail,
          password: ownerPassword,
          role: 'admin'
        });
        console.log('✅ [Auth] Official Owner created in Database');
      }

      return res.json({
        _id: owner._id,
        name: owner.name,
        email: owner.email,
        role: owner.role,
        token: generateToken(owner._id),
      });
    } catch (error) {
      console.error('❌ [Auth] Owner DB Synchronization Failed:', error.message);
      // Fallback to mock session
      const mockAdminId = '65a123456789012345678901';
      return res.json({
        _id: mockAdminId,
        name: 'Store Owner (Offline Mode)',
        email: ownerEmail,
        role: 'admin',
        token: generateToken(mockAdminId),
      });
    }
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
