import './config/env.js';
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 1. GLOBAL MIDDLEWARE
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use((req, res, next) => {
  res.setHeader('X-Vault-Engine', 'Samadhan-Shoes-Elite');
  // Log every request to help debug 405 errors
  console.log(`📡 [${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// 2. API ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/service-centers', serviceCenterRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'active',
    port: process.env.PORT || 5055,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// 3. STATIC ASSETS
const uploadsPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsPath));

const publicAssetsPath = path.join(__dirname, 'public');
app.use('/New-Samadhan-Shoe-Mart', express.static(path.join(publicAssetsPath, 'New-Samadhan-Shoe-Mart')));

// 4. GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error('🔥 [Server Error]', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'An internal vault error occurred.',
  });
});

// Force start on 5055
const PORT = process.env.PORT || 5055;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n================================================`);
  console.log(`🚀 SAMADHAN SHOE MART BACKEND INITIALIZED`);
  console.log(`📡 PORT: ${PORT}`);
  console.log(`🔗 HEALTH: http://localhost:${PORT}/api/health`);
  console.log(`================================================\n`);
});

connectDB();

export default app;
