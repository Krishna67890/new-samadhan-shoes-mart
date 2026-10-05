import mongoose from 'mongoose';

const connectDB = async () => {
  const connUri = process.env.MONGO_URI;

  if (!connUri) {
    console.error('❌ [Database] CRITICAL: MONGO_URI is not defined in Environment Variables.');
    console.error('   Action: Set MONGO_URI in Vercel Dashboard for Global Sync.');
    return false;
  }

  try {
    mongoose.set('bufferCommands', false);
    const conn = await mongoose.connect(connUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10s timeout for cloud
    });

    console.log(`✅ [Database] Connected to Global Vault: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ [Database] Global Sync Connection Failed: ${error.message}`);
    return false;
  }
};

export default connectDB;
