import path from 'path';
import fs from 'fs';
import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';

const router = express.Router();

// Get absolute path to the uploads directory relative to this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|glb|gltf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype) || path.extname(file.originalname).toLowerCase() === '.glb' || path.extname(file.originalname).toLowerCase() === '.gltf';

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images or 3D Models (.glb, .gltf) only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', (req, res) => {
  console.log('📂 [Upload] Received upload request...');

  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.error('❌ [Upload] Multer Error:', err.message);
      return res.status(400).json({ message: `Image Upload Error: ${err.message}` });
    } else if (err) {
      console.error('❌ [Upload] Custom Error:', err);
      // Ensure we always return a message property for useFetch to catch
      const errMsg = err.message || (typeof err === 'string' ? err : 'Server storage error');
      return res.status(400).json({ message: errMsg });
    }

    if (!req.file) {
      console.error('❌ [Upload] No file in request');
      return res.status(400).json({ message: 'No file was selected' });
    }

    console.log('✅ [Upload] Success:', req.file.filename);
    const relativePath = `/uploads/${req.file.filename}`;
    res.status(200).json(relativePath);
  });
});

export default router;
