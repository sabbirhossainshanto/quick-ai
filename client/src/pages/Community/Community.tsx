import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import type { ICreation } from "../../type";
import { Heart } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Community = () => {
  const axiosSecure = useAxiosSecure();
  const [creations, setCreations] = useState<ICreation[]>([]);
  const { user } = useUser();
  const fetchCreations = async () => {
    const { data } = await axiosSecure.get("/api/v1/users/published-creations");
    setCreations(data?.data);
  };

  const imageLikeToggle = async (id: number) => {
    const { data } = await axiosSecure.post("/api/v1/users/toggle-like", {
      id,
    });
    if (data?.success) {
      toast.success(data?.message);
      await fetchCreations();
    } else {
      toast.error(data?.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      Creations
      <div className="bg-white h-full w-full rounded-xl overflow-y-scroll">
        {creations?.map((creation, idx) => (
          <div
            key={idx}
            className="relative group inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3"
          >
            <img
              src={creation.content}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg">
              <p className="text-sm hidden group-hover:block">
                {creation.prompt}
              </p>
              <div className="flex gap-1 items-center">
                <p>{creation.likes.length}</p>
                <Heart
                  onClick={() => imageLikeToggle(creation?.id)}
                  className={`min-h-5 hover:scale-110 cursor-pointer ${
                    user && creation?.likes?.includes(user?.id)
                      ? "fill-red-500 text-red-600"
                      : "text-white"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
