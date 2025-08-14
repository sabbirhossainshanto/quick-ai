import status from "http-status";
import sendResponse from "../../utils/sendResponse";
import { articleService } from "./article.service";
import catchAsync from "../../utils/catchAsync";

const generateArticle = catchAsync(async (req, res) => {
  const { message, success, data } = await articleService.generateArticle(req);
  sendResponse(res, {
    success,
    statusCode: status.OK,
    message,
    data,
  });
});

export const articleController = {
  generateArticle,
};
