import "express";

declare module "express-serve-static-core" {
  interface Request {
    auth?: any;
    free_usage: number;
    plan?: "premium" | "free";
  }
}
