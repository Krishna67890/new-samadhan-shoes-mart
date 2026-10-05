import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
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

dotenv.config();

const app = express();

// Standard Middleware
app.use(express.json());
app.use(cors());

// --- ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/service-centers', serviceCenterRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();

// Fix: Serve uploads from the correct backend/uploads folder
const uploadsPath = path.join(__dirname, 'backend', 'uploads');
app.use('/uploads', express.static(uploadsPath));

// Also serve root uploads if they exist for compatibility
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));
} else {
  app.get('/', (req, res) => res.send('Identity Vault API is active. (Database status pending)'));
}

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 [Server] New Samadhan Shoe Mart active on port ${PORT}`);
    connectDB();
  });
}

connectDB(); // Ensure DB connects in production

export default app;
