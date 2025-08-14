import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), "/.env") });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  gemini_api_key: process.env.GEMINI_API_KEY,
  gemini_api_base_url: process.env.GEMINI_API_BASE_URL,
  clip_drop_api_key: process.env.CLIP_DROP_API_KEY,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
