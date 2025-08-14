import { Request } from "express";
import sql from "../../config/DB";
import { clerkClient } from "@clerk/express";
import { AI } from "../../utils/openAI";

const generateArticle = async (req: Request) => {
  const { userId } = req.auth();
  const { prompt, length } = req.body;
  const { plan, free_usage } = req;
  if (plan !== "premium" && free_usage >= 10) {
    return {
      message: "Limit reached. Upgrade to continue",
      success: false,
      data: null,
    };
  }

  const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: length,
  });
  const content = response.choices?.[0]?.message?.content;
  await sql`INSERT INTO creation (user_id,prompt,content,type)
  VALUES (${userId},${prompt},${content},'article')
  `;
  if (plan !== "premium") {
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        free_usage: free_usage + 1,
      },
    });
  }
  return {
    message: "Article generated successfully",
    success: true,
    data: content,
  };
};

export const articleService = {
  generateArticle,
};
