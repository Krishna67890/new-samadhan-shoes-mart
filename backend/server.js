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

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));
} else {
  app.get('/', (req, res) => res.send('Identity Vault API is active. (Database status pending)'));
}

const PORT = process.env.PORT || 5000;

// Senior Architect Note: Start the server immediately so Guest mode works.
// Connect to DB in the background.
app.listen(PORT, () => {
  console.log(`🚀 [Server] New Samadhan Shoe Mart active on port ${PORT}`);
  console.log(`💡 [System] Guest Login is now ENABLED.`);

  // Background connection attempt
  connectDB();
});
