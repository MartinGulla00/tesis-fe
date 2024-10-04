import * as paths from "../routing/paths";
import axios from "axios";

import { store } from  "@/state/store";
import { getToken } from "@/utils/tokenStorage";

const axiosInterceptors = () => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        store.dispatch({ type: "auth/logout" });
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
