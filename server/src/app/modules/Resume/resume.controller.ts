import status from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { resumeService } from "./resume.service";

const reviewResume = catchAsync(async (req, res) => {
  const { message, success, data } = await resumeService.reviewResume(req);
  sendResponse(res, {
    success,
    statusCode: status.OK,
    message,
    data,
  });
});

export const resumeController = {
  reviewResume,
};
