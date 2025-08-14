import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { imageController } from "./image.controller";
import { upload } from "../../utils/multer";

const router = Router();

router.post("/generate-image", auth, imageController.generateImage);
router.post(
  "/remove-image-background",
  upload.single("image"),
  auth,
  imageController.removeImageBackground
);
router.post(
  "/remove-image-object",
  upload.single("image"),
  auth,
  imageController.removeImageObject
);

export const imageRoute = router;
