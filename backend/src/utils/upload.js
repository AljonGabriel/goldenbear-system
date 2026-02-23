// utils/upload.js
import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads folder exists at project root
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const category = req.body.category
      ? req.body.category.toLowerCase().replace(/\s+/g, "-")
      : "uncategorized";
    const name = req.body.name
      ? req.body.name.toLowerCase().replace(/\s+/g, "-")
      : "noname";

    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, `${category}-${name}-${uniqueSuffix}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
