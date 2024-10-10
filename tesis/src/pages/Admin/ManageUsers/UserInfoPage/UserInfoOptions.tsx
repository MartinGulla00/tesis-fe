import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  ChevronDownIcon,
  PinBottomIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "@/hooks/common/useMediaQuery";

type Props = {
  refetch: () => void;
};

function UserInfoOptions({ refetch }: Props) {
  const { isMobile } = useMediaQuery();

  const [isRefetchLoading, setIsRefetchLoading] = useState<boolean>(false);

  const handleRefetch = () => {
    try {
      setIsRefetchLoading(true);
      refetch();
      setIsRefetchLoading(false);
    } catch {
      toast.error("Error al actualizar datos", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  if (isMobile) {
    return (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="default">
              Opciones
              <ChevronDownIcon className="ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {isRefetchLoading ? (
              <DropdownMenuItem disabled>
                <ReloadIcon className="animate-spin mr-2" />
                Refrescando
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={handleRefetch}>
                <ReloadIcon className="mr-2" />
                Refrescar
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="flex space-x-2">
      {isRefetchLoading ? (
        <Button variant="outline" disabled>
          <ReloadIcon className="animate-spin mr-2" />
          Refrescar
        </Button>
      ) : (
        <Button variant="outline" onClick={handleRefetch}>
          <ReloadIcon className="mr-2" />
          Refrescar
        </Button>
      )}
    </div>
  );
}

export default UserInfoOptions;
