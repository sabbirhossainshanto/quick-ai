import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { articleController } from "./article.controller";

const router = Router();

router.post("/generate-article", auth, articleController.generateArticle);

export const articleRoute = router;
