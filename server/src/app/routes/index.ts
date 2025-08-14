import { Router } from "express";
import { articleRoute } from "../modules/Article/article.route";
import { blogTitleRoute } from "../modules/BlogTitle/blogTitle.route";
import { imageRoute } from "../modules/Image/image.route";
import { resumeRoute } from "../modules/Resume/resume.route";
import { userRoute } from "../modules/User/user.route";

const moduleRoutes = [
  {
    path: "/article",
    route: articleRoute,
  },
  {
    path: "/blog-title",
    route: blogTitleRoute,
  },
  {
    path: "/image",
    route: imageRoute,
  },
  {
    path: "/resume",
    route: resumeRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
];

const router = Router();
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
