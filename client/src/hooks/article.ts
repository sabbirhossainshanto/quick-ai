import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export const useGenerateArticle = () => {
  const axiosSecure = useAxiosSecure();
  return useMutation({
    mutationKey: ["article"],
    mutationFn: async (payload: { prompt: string; length: number }) => {
      const { data } = await axiosSecure.post(
        `/api/v1/article/generate-article`,
        payload
      );
      return data;
    },
  });
};
