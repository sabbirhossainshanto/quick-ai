import status from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { blogTitleService } from "./blogTitle.service";

const generateBlogTitle = catchAsync(async (req, res) => {
  const { message, success, data } = await blogTitleService.generateBlogTitle(
    req
  );
  sendResponse(res, {
    success,
    statusCode: status.OK,
    message,
    data,
  });
});

export const blogTitleController = {
  generateBlogTitle,
};
