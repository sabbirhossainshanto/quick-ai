import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export const useGenerateBlogTitle = () => {
  const axiosSecure = useAxiosSecure();
  return useMutation({
    mutationKey: ["blog-title"],
    mutationFn: async (payload: { prompt: string }) => {
      const { data } = await axiosSecure.post(
        `/api/v1/blog-title/generate-blog-title`,
        payload
      );
      return data;
    },
  });
};
