import mongoose from 'mongoose';

const connectDB = async () => {
  // We force IPv4 (127.0.0.1) to avoid Windows localhost issues
  const connUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/samadhan_shoes';

  console.log('📡 [Database] Attempting to connect to Identity Vault...');

  try {
    // Disable buffering so that if DB is offline, queries fail immediately instead of hanging
    mongoose.set('bufferCommands', false);

    const conn = await mongoose.connect(connUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ [Database] Identity Vault Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ [Database] CONNECTION CRITICAL FAILURE:`);
    console.error(`   Reason: ${error.message}`);
    console.error(`   Status: MongoDB Service is likely STOPPED.`);
    console.log(`🔄 [Database] Retrying in 5s... Please start your MongoDB Service.`);

    // Non-blocking background attempt: we don't 'return connectDB()' here.
    // We let the server stay alive for Guest/Admin bypass.
    setTimeout(connectDB, 5000);
    return false;
  }
};

export default connectDB;
