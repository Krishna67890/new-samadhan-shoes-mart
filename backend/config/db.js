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
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`✅ [Database] GLOBAL VAULT ACTIVE`);
    console.log(`📡 [Host] ${conn.connection.host}`);
    console.log(`📦 [Status] Synced with Cluster: ${conn.connection.name}`);
    return true;
  } catch (error) {
    console.error(`❌ [Database] SYNC ERROR`);
    console.error(`📝 [Reason] ${error.message}`);
    if (error.message.includes('IP not whitelisted')) {
      console.error(`💡 [Action] Go to Atlas -> Network Access -> Add 0.0.0.0/0`);
    }
    return false;
  }
};

export default connectDB;
