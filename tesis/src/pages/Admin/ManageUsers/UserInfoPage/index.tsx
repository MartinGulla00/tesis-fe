import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as paths from "@/routing/paths";
import { ChevronLeftIcon } from "lucide-react";
import Heading1 from "@/components/headings/Heading1";
import UserDetails from "./UserDetails";
import UserInfoOptions from "./UserInfoOptions";

type Props = {};

function UserInfoPage({}: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const idParam = queryParams.get("id");
    if (idParam !== null) {
      setUserId(idParam);
    }
  }, [location]);

  const handleBack = () => {
    navigate(paths.DEF_USERS);
  };

  return (
    <div className="flex flex-col pb-6 h-full">
      <div className="flex justify-between mt-4 mb-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-8">
            <Button
              variant="ghost"
              className="bg-zinc-200 text-zinc-600 hover:bg-zinc-300 hover:text-zinc-700"
              onClick={() => handleBack()}
            >
              <ChevronLeftIcon />
              <span className="hidden md:block ml-2">Volver</span>
            </Button>
            <Heading1 text="Detalle de usuario" />
          </div>
          {/* <UserInfoOptions refetch={() => window.location.reload()} /> */}
        </div>
        <div className="flex space-x-2"></div>
      </div>
      <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-6 lg:space-y-0">
        {userId && userId.length > 0 && (
          <>
            <UserDetails id={userId} />
            <div className="flex flex-col space-y-4 lg:space-y-6 lg:w-3/4">
              {/* <UserEventsTable id={userId} /> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserInfoPage;
