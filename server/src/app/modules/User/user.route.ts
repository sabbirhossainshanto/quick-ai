import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { userController } from "./user.controller";

const router = Router();

router.get("/creations", auth, userController.getUserCreations);
router.get("/published-creations", auth, userController.getPublishedCreations);
router.post("/toggle-like", auth, userController.toggleLikeCreation);

export const userRoute = router;
