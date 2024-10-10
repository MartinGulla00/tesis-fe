import * as paths from "../routing/paths";
import axios from "axios";
import { getToken } from "@/utils/tokenStorage";
import { wipeAuthData } from "@/utils/authStorage";

const axiosInterceptors = () => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        wipeAuthData();
        window.location.href = paths.LANDING;
      }
      return Promise.reject(error);
    }
  );

  axios.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers["Authorization"] = token;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
};

export default axiosInterceptors;
