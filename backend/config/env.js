import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from the backend root directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('📝 [Env] Variables loaded from:', path.resolve(__dirname, '../.env'));
console.log('📡 [Env] Target Backend Port:', process.env.PORT || 5055);
if (!process.env.JWT_SECRET) console.error('❌ [Env] CRITICAL: JWT_SECRET is missing!');
