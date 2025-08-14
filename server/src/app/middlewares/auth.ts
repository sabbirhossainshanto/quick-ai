import { clerkClient } from "@clerk/express";
import catchAsync from "../utils/catchAsync";

export const auth = catchAsync(async (req, res, next) => {
  const { userId, has } = req.auth();
  const hasPremiumPlan = await has({ plan: "premium" });
  const user = await clerkClient.users.getUser(userId);
  if (!hasPremiumPlan && user.privateMetadata.free_usage) {
    req.free_usage = user.privateMetadata.free_usage as number;
  } else {
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        free_usage: 0,
      },
    });
    req.free_usage = 0;
  }
  req.plan = hasPremiumPlan ? "premium" : "free";
  next();
});
