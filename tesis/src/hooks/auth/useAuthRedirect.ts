import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as paths from "@/routing/paths";
import { getAuthDetails } from "@/utils/authStorage";
import { getToken } from "@/utils/tokenStorage";

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    if (token != null) {
      navigate(paths.LANDING);
    } else {
      navigate(paths.LOGIN);
    }
  }, [token, navigate]);
};
