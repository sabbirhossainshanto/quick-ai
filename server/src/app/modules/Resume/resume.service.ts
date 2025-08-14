import { Request } from "express";
import sql from "../../config/DB";
import fs from "fs";
import pdf from "pdf-parse";
import { AI } from "../../utils/openAI";

const reviewResume = async (req: Request) => {
  const { userId } = req.auth();
  const resume = req.file;
  const { plan } = req;
  if (plan !== "premium") {
    return {
      message: "This feature is only available for premium subscriptions",
      success: false,
      data: null,
    };
  }
  if (resume && resume?.size > 5 * 1024 * 1024) {
    return {
      message: "Resume file size exceeds allowed size (5MB).",
      success: false,
      data: null,
    };
  }
  if (resume) {
    const dataBuffer = fs.readFileSync(resume?.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weakness, and area for improvement. Resume Content:\n\n${pdfData.text}`;
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });
    const content = response.choices?.[0]?.message?.content;
    await sql`INSERT INTO creation (user_id,prompt,content,type)
  VALUES (${userId},"Review the uploaded resume",${content},'resume-review')
  `;

    return {
      message: "Resume review successfully",
      success: true,
      data: content,
    };
  } else {
    return {
      message: "Resume not found",
      success: true,
      data: null,
    };
  }
};
export const resumeService = {
  reviewResume,
};
