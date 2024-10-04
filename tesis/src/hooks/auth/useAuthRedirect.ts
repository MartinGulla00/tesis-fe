import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as paths from "@/routing/paths";
import { selectAuth } from "@/state/selectors";

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const authState = useSelector(selectAuth);

  useEffect(() => {
    if (authState?.token != null) {
      navigate(paths.LANDING);
    }
  }, [authState, navigate]);
};
