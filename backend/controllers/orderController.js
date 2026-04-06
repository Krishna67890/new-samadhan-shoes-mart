import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ message: 'No order items' });
      return;
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress: {
          address: shippingAddress.address,
          city: shippingAddress.city,
          postalCode: shippingAddress.postalCode,
          country: shippingAddress.country || 'India',
          phone: req.body.phone || req.user.phone || '',
        },
        paymentMethod,
        totalPrice,
      });

      const createdOrder = await order.save();

      // Send Confirmation Email
      try {
        const orderList = orderItems.map(item => `${item.name} (Qty: ${item.qty})`).join(', ');
        await sendEmail({
          email: req.user.email,
          subject: `Order Confirmation - NEW SAMADHAN SHOE MART`,
          message: `Hello ${req.user.name},\n\nYour order #${createdOrder._id} has been placed successfully.\n\nItems: ${orderList}\nTotal Amount: ₹${totalPrice}\n\nPlease complete your payment via WhatsApp if you haven't already.\n\nThank you for shopping with us!`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
              <h1 style="color: #2563eb;">Order Confirmed!</h1>
              <p>Hello <strong>${req.user.name}</strong>,</p>
              <p>Thank you for your order at <strong>NEW SAMADHAN SHOE MART</strong>.</p>
              <div style="background: #f3f4f6; padding: 15px; border-radius: 10px; margin: 20px 0;">
                <p><strong>Order ID:</strong> ${createdOrder._id}</p>
                <p><strong>Total Amount:</strong> ₹${totalPrice}</p>
              </div>
              <p>Please complete your payment through WhatsApp to initiate shipping.</p>
              <a href="https://wa.me/919876543210" style="display: inline-block; padding: 10px 20px; background: #10b981; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Pay via WhatsApp</a>
            </div>
          `
        });
      } catch (emailErr) {
        console.error('Email failed to send:', emailErr);
      }

      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard analytics (Extended)
// @route   GET /api/orders/analytics
// @access  Private/Admin
const getAdminAnalytics = async (req, res) => {
    try {
      const totalUsers = await User.countDocuments({});
      const totalOrders = await Order.countDocuments({});

      const orders = await Order.find({});
      const revenue = orders.reduce((acc, order) => acc + (order.isPaid ? order.totalPrice : 0), 0);

      // Mocking active visitors for this demonstration
      const activeVisitors = Math.floor(Math.random() * 50) + 10;

      res.json({
        totalUsers,
        totalOrders,
        revenue,
        activeVisitors,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  getAdminAnalytics
};
