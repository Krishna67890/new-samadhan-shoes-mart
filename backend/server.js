import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/db.js';

// Get absolute paths in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route Imports
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import shopRoutes from './routes/shopRoutes.js';
import serviceCenterRoutes from './routes/serviceCenterRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

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

// Also serve public assets if they are mirrored in backend (optional but helpful for local network testing)
const publicAssetsPath = path.join(__dirname, 'public');
app.use('/New-Samadhan-Shoe-Mart', express.static(path.join(publicAssetsPath, 'New-Samadhan-Shoe-Mart')));

// Health check for Vercel/Render
app.get('/api/health', (req, res) => {
  res.json({
    status: 'active',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    time: new Date()
  });
});

const PORT = process.env.PORT || 5000;

// Listen if not on Vercel (works for both Local Dev and Local Production)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 [Server] New Samadhan Shoe Mart active on port ${PORT}`);
  });
}

connectDB();

export default app;
