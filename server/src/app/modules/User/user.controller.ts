import status from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { userService } from "./user.service";

const getUserCreations = catchAsync(async (req, res) => {
  const { message, success, data } = await userService.getUserCreations(req);
  sendResponse(res, {
    success,
    statusCode: status.OK,
    message,
    data,
  });
});
const getPublishedCreations = catchAsync(async (req, res) => {
  const { message, success, data } = await userService.getPublishCreations();
  sendResponse(res, {
    success,
    statusCode: status.OK,
    message,
    data,
  });
});
const toggleLikeCreation = catchAsync(async (req, res) => {
  const { message, success, data } = await userService.toggleLikeCreation(req);
  sendResponse(res, {
    success,
    statusCode: status.OK,
    message,
    data,
  });
});

export const userController = {
  getUserCreations,
  getPublishedCreations,
  toggleLikeCreation,
};
