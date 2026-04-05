import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
import Visitor from '../models/visitorModel.js';

// @desc    Get admin statistics
// @route   GET /api/admin/stats
// @access  Admin
const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find({ isPaid: true });
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    const activeVisitors = await Visitor.countDocuments({
      visitedAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) }, // Last 5 minutes
    });

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      activeVisitors,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
};

// @desc    Get recent visitors
// @route   GET /api/admin/visitors
// @access  Admin
const getRecentVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ visitedAt: -1 }).limit(100);
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching visitors' });
  }
};

export { getAdminStats, getRecentVisitors };
