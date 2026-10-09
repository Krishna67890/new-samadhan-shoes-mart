import User from '../models/userModel.js';
import fs from 'fs';
import path from 'path';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  // Handle Offline Admin Identity
  if (req.user._id === 'offline_admin_001') {
    return res.json({
      _id: 'offline_admin_001',
      name: 'Store Owner (Offline)',
      email: process.env.OWNER_EMAIL || 'Command@SamadhanShoe.com',
      role: 'admin',
      identityVerified: true,
      avatar: '/uploads/avatars/default-avatar.png',
    });
  }

  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || '',
      address: user.address || '',
      city: user.city || '',
      state: user.state || '',
      pincode: user.pincode || '',
      gender: user.gender || '',
      shoeSize: user.shoeSize || '',
      stylePreference: user.stylePreference || '',
      identityVerified: user.identityVerified || false,
      avatar: user.avatar,
    });
  } else {
    res.status(404).json({ message: 'User not found in Vault records.' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  if (req.user._id === 'offline_admin_001') {
    return res.status(403).json({
      message: 'Profile updates are disabled in Master Bypass Offline Mode. Please restore Database connection.'
    });
  }

  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.city = req.body.city || user.city;
    user.state = req.body.state || user.state;
    user.pincode = req.body.pincode || user.pincode;
    user.gender = req.body.gender || user.gender;
    user.shoeSize = req.body.shoeSize || user.shoeSize;
    user.stylePreference = req.body.stylePreference || user.stylePreference;
    user.identityVerified = req.body.identityVerified !== undefined ? req.body.identityVerified : user.identityVerified;

    if (req.body.password) {
      user.password = req.body.password;
    }

    if (req.file) {
      // Delete old avatar if it's not the default
      if (user.avatar && !user.avatar.includes('default-avatar.png')) {
        const oldPath = path.join(process.cwd(), user.avatar);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      user.avatar = `/uploads/avatars/${req.file.filename}`;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
      address: updatedUser.address,
      city: updatedUser.city,
      state: updatedUser.state,
      pincode: updatedUser.pincode,
      gender: updatedUser.gender,
      shoeSize: updatedUser.shoeSize,
      stylePreference: updatedUser.stylePreference,
      identityVerified: updatedUser.identityVerified,
      avatar: updatedUser.avatar,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export { getUserProfile, updateUserProfile };
