import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PiUserCircle } from "react-icons/pi";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as paths from "@/routing/paths";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExitIcon, ReloadIcon } from "@radix-ui/react-icons";
import { logoutUser } from "@/services/userService";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useDispatch } from "react-redux";
import { logout } from "@/state/auth/authSlice";
import useToaster from "@/hooks/common/useToaster";

export const UserMenu = () => {
  const { showToast, showToastError } = useToaster();

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const authState = useSelector((state: RootState) => state.auth.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isModalOpen) {
      const closeModal = () => setIsModalOpen(false);
      const closeButton = document.querySelector(
        '[class*="absolute right-4 top-4"]'
      );

      closeButton?.addEventListener("click", closeModal);

      return () => {
        closeButton?.removeEventListener("click", closeModal);
      };
    }
  }, [isModalOpen]);

  const { mutate, isLoading } = useMutation(logoutUser, {
    onSuccess: () => {
      dispatch(logout());
      showToast("Sesión cerrada");
      navigate(paths.LOGIN);
    },
    onError: (err) => {
      showToastError(err, "Error al cerrar sesión");
    },
  });

  const handleLogoutPrompt = () => {
    setIsDropdownOpen(false);
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    mutate();
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className="flex items-center space-x-2 relative rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-900 p-2 pl-4 pr-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            <span className="text-sm text-brand-green font-bold">
              {authState?.user?.username.toUpperCase()}
            </span>
            <PiUserCircle className="text-2xl dark:text-zinc-50" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="cursor-pointer font-medium"
            onClick={handleLogoutPrompt}
          >
            <ExitIcon className="mr-4" />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isModalOpen && (
        <Dialog open={isModalOpen}>
          <DialogContent className="flex flex-col items-center justify-center">
            <DialogHeader>
              <DialogTitle>Cerrar sesión</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-center">
              ¿Está seguro que quiere cerrar sesión?
            </DialogDescription>
            <DialogFooter>
              {isLoading ? (
                <Button variant="destructive" disabled>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  <span>Cerrando sesión</span>
                </Button>
              ) : (
                <Button variant="destructive" onClick={handleLogout}>
                  Sí, cerrar sesión
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
