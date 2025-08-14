import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { resumeController } from "./resume.controller";
import { upload } from "../../utils/multer";

const router = Router();

router.post(
  "/review-resume",
  upload.single("resume"),
  auth,
  resumeController.reviewResume
);

export const resumeRoute = router;
