import User from '../models/userModel.js';
import fs from 'fs';
import path from 'path';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
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
      pincode: user.pincode || '',
      avatar: user.avatar,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.city = req.body.city || user.city;
    user.pincode = req.body.pincode || user.pincode;

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
      pincode: updatedUser.pincode,
      avatar: updatedUser.avatar,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export { getUserProfile, updateUserProfile };
