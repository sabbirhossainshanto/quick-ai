import express from "express";
import cors from "cors";
import config from "./app/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import router from "./app/routes";
import connectToCloudinary from "./app/utils/cloudinary";

const app = express();
connectToCloudinary();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.use(requireAuth());

app.use("/api/v1", router);
app.get("/", (req, res) => res.send("Server is Live"));

app.listen(config.port, () => {
  console.log(`Server is running on port`, config.port);
});
