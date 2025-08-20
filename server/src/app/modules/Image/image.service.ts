import { Request } from "express";
import sql from "../../config/DB";
import { v2 as cloudinary } from "cloudinary";
import axios from "axios";
import config from "../../config";

const generateImage = async (req: Request) => {
  const { userId } = req.auth();
  const { prompt, publish } = req.body;
  const { plan } = req;
  if (plan !== "premium") {
    return {
      message: "This feature is only available for premium subscriptions",
      success: false,
      data: null,
    };
  }

  const formData = new FormData();
  formData.append("prompt", prompt);
  const { data } = await axios.post(
    `https://clipdrop-api.co/text-to-image/v1`,
    formData,
    {
      headers: {
        "x-api-key": config.clip_drop_api_key,
      },
      responseType: "arraybuffer",
    }
  );

  const base64Image = `data:image/png;base64, ${Buffer.from(
    data,
    "binary"
  ).toString("base64")}`;
  const { secure_url } = await cloudinary.uploader.upload(base64Image);
  await sql`INSERT INTO creation (user_id,prompt,content,type,publish)
  VALUES (${userId},${prompt},${secure_url},'image',${publish ?? false})
  `;

  return {
    message: "Image generated successfully",
    success: true,
    data: secure_url,
  };
};

const removeImageBackground = async (req: Request) => {
  const { userId } = req.auth();
  const image = req.file;
  const { plan } = req;
  if (plan !== "premium") {
    return {
      message: "This feature is only available for premium subscriptions",
      success: false,
      data: null,
    };
  }
  if (image) {
    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    await sql`INSERT INTO creation (user_id,prompt,content,type)
  VALUES (${userId},"Remove background from image",${secure_url},'image')
  `;

    return {
      message: "Image background removed successfully",
      success: true,
      data: secure_url,
    };
  } else {
    return {
      message: "Image not found",
      success: false,
      data: null,
    };
  }
};

const removeImageObject = async (req: Request) => {
  const { userId } = req.auth();
  const { object } = req.body;
  const image = req.file;
  const { plan } = req;
  if (plan !== "premium") {
    return {
      message: "This feature is only available for premium subscriptions",
      success: false,
      data: null,
    };
  }
  if (image) {
    const { public_id } = await cloudinary.uploader.upload(image.path);

    const imageUrl = cloudinary.url(public_id, {
      transformation: [
        {
          effect: `gen_remove:${object}`,
        },
      ],
      resource_type: "image",
    });
    await sql`INSERT INTO creation (user_id,prompt,content,type)
  VALUES (${userId},${`Removed ${object} from image`},${imageUrl},'image')
  `;

    return {
      message: "Image background removed successfully",
      success: true,
      data: imageUrl,
    };
  } else {
    return {
      message: "Image not found",
      success: false,
      data: null,
    };
  }
};
export const imageService = {
  generateImage,
  removeImageBackground,
  removeImageObject,
};
