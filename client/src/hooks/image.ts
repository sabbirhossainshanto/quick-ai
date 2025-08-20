import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export const useGenerateImage = () => {
  const axiosSecure = useAxiosSecure();
  return useMutation({
    mutationKey: ["image"],
    mutationFn: async (payload: { prompt: string; publish: boolean }) => {
      const { data } = await axiosSecure.post(
        `/api/v1/image/generate-image`,
        payload
      );
      return data;
    },
  });
};
export const useRemoveImageBG = () => {
  const axiosSecure = useAxiosSecure();
  return useMutation({
    mutationKey: ["image-bg"],
    mutationFn: async (payload: FormData) => {
      const { data } = await axiosSecure.post(
        `/api/v1/image/remove-image-background`,
        payload
      );
      return data;
    },
  });
};
export const useRemoveImageObject = () => {
  const axiosSecure = useAxiosSecure();
  return useMutation({
    mutationKey: ["image-object"],
    mutationFn: async (payload: FormData) => {
      const { data } = await axiosSecure.post(
        `/api/v1/image/remove-image-object`,
        payload
      );
      return data;
    },
  });
};
