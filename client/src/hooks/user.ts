import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export const useUserCreation = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["resume-review"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/v1/users/creations`);
      return data;
    },
  });
};
