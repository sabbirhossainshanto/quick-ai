import { Request } from "express";
import sql from "../../config/DB";

const getUserCreations = async (req: Request) => {
  const { userId } = req.auth();

  const creations =
    await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC
  `;

  return {
    message: "Creations retrieved successfully",
    success: true,
    data: creations,
  };
};
const getPublishCreations = async () => {
  const creations =
    await sql`SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC
  `;

  return {
    message: "Published creations retrieved successfully",
    success: true,
    data: creations,
  };
};
const toggleLikeCreation = async (req: Request) => {
  const { userId } = req.auth();
  const { id } = req.body;
  const [creation] =
    await sql`SELECT * FROM creations WHERE id = ${id} ORDER BY created_at DESC
  `;
  if (!creation) {
    return {
      message: "Creation not found",
      success: false,
      data: null,
    };
  }

  const currentLikes = creation.likes;
  const userIdStr = userId.toString();
  let updatedLikes;
  let message;
  if (currentLikes.includes(userIdStr)) {
    updatedLikes = currentLikes.filter((user: string) => user !== userIdStr);
    message = "Creation like removed";
  } else {
    updatedLikes = [...currentLikes, userIdStr];
    message = "Creation liked";
  }

  const formattedArray = `{${updatedLikes.json(",")}}`;
  await sql`UPDATE creations SET likes = ${formattedArray}:text[] WHERE id = ${id}
  `;
  return {
    message,
    success: true,
    data: null,
  };
};

export const userService = {
  getUserCreations,
  getPublishCreations,
  toggleLikeCreation,
};
