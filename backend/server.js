import 'dotenv/config'; // Critical: Load environment variables BEFORE any other imports
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/db.js';

// Route Imports
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import shopRoutes from './routes/shopRoutes.js';
import serviceCenterRoutes from './routes/serviceCenterRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Get absolute paths in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Standard Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
  origin: '*', // Allow all devices on the network
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// --- ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/service-centers', serviceCenterRoutes);
app.use('/api/upload', uploadRoutes);

// Fix: Serve uploads from the absolute backend/uploads folder
const uploadsPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsPath));

// Also serve public assets if they are mirrored in backend
const publicAssetsPath = path.join(__dirname, 'public');
app.use('/New-Samadhan-Shoe-Mart', express.static(path.join(publicAssetsPath, 'New-Samadhan-Shoe-Mart')));

import os from 'os';

// Health check for Vercel/Render & Mobile Debugging
app.get('/api/health', (req, res) => {
  const networkInterfaces = os.networkInterfaces();
  const ips = [];
  for (const name of Object.keys(networkInterfaces)) {
    for (const net of networkInterfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        ips.push(net.address);
      }
    }
  }

  res.json({
    status: 'active',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    dbName: mongoose.connection.name,
    serverTime: new Date(),
    localIps: ips,
    instructions: "1. Ensure phone is on SAME Wi-Fi. 2. Whitelist 0.0.0.0/0 in Atlas. 3. Allow Port 5000 in Windows Firewall."
  });
});

// GLOBAL ERROR HANDLER - Prevents "Unexpected end of JSON input" by ensuring JSON is always returned
app.use((err, req, res, next) => {
  console.error('🔥 [Server Error]', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'An internal vault error occurred.',
    stack: process.env.NODE_ENV === 'development' ? err.stack : null
  });
});

const PORT = process.env.PORT || 5000;

// Listen if not on Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 [Server] New Samadhan Shoe Mart active on port ${PORT}`);
    console.log(`📡 [Network] Accessible via: http://0.0.0.0:${PORT}`);
  });
}

connectDB();

export default app;
