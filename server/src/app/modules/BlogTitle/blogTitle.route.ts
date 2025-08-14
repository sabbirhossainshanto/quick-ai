import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { blogTitleController } from "./blogTitle.controller";

const router = Router();

router.post(
  "/generate-blog-title",
  auth,
  blogTitleController.generateBlogTitle
);

export const blogTitleRoute = router;
