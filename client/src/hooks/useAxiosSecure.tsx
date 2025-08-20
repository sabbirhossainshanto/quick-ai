import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

// create axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const useAxiosSecure = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    // add interceptors
    const reqInterceptor = instance.interceptors.request.use(
      async (config) => {
        const token = await getToken();
        if (token) {
          // ✅ don’t overwrite, just set header
          config.headers = config.headers || {};
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (config.headers as any).Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resInterceptor = instance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error)
    );

    // 🧹 cleanup: remove interceptors on unmount
    return () => {
      instance.interceptors.request.eject(reqInterceptor);
      instance.interceptors.response.eject(resInterceptor);
    };
  }, [getToken]);

  return instance; // ✅ safe axios instance
};

export default useAxiosSecure;
