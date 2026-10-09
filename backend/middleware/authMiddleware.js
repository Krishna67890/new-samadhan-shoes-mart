import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  let token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Handle Master Bypass Offline Identity
      if (decoded.id === 'offline_admin_001') {
        req.user = {
          _id: 'offline_admin_001',
          name: 'Store Owner (Offline)',
          role: 'admin',
          email: process.env.OWNER_EMAIL || 'Command@SamadhanShoe.com'
        };
        return next();
      }

      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token failed, unauthorized!' });
    }
  } else {
    res.status(401).json({ message: 'No token, unauthorized!' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Admin access required!' });
  }
};

export { protect, admin };
