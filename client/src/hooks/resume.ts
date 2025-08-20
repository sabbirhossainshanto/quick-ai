import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export const useReviewResume = () => {
  const axiosSecure = useAxiosSecure();
  return useMutation({
    mutationKey: ["resume-review"],
    mutationFn: async (payload: FormData) => {
      const { data } = await axiosSecure.post(
        `/api/v1/resume/review-resume`,
        payload
      );
      return data;
    },
  });
};
