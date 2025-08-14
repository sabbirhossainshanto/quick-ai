import status from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { imageService } from "./image.service";

const generateImage = catchAsync(async (req, res) => {
  const { message, success, data } = await imageService.generateImage(req);
  sendResponse(res, {
    success,
    statusCode: status.OK,
    message,
    data,
  });
});

const removeImageBackground = catchAsync(async (req, res) => {
  const { message, success, data } = await imageService.removeImageBackground(
    req
  );
  sendResponse(res, {
    success,
    statusCode: status.OK,
    message,
    data,
  });
});
const removeImageObject = catchAsync(async (req, res) => {
  const { message, success, data } = await imageService.removeImageObject(req);
  sendResponse(res, {
    success,
    statusCode: status.OK,
    message,
    data,
  });
});

export const imageController = {
  generateImage,
  removeImageBackground,
  removeImageObject,
};
