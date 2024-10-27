import { Role } from "@/types/role";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
import EditRoleNameDialog from "./EditRoleNameDialog";
import EditRolePermissionsDialog from "./EditRolePermissionsDialog";

type Props = { role?: Role; isHovered: boolean; onStatusUpdate?: () => void };

const RoleListItemOptions: React.FC<Props> = ({
  role,
  isHovered,
  onStatusUpdate,
}: Props) => {
  if (!isHovered) {
    return (
      <div className="h-8">
        <Button size="icon" className="invisible">
          <CheckIcon />
        </Button>
        <Button size="icon" className="invisible">
          <CheckIcon />
        </Button>
        <Button size="icon" className="invisible">
          <CheckIcon />
        </Button>
      </div>
    );
  }

  if (role && isHovered) {
    return (
      <div className="h-8 flex items-center space-x-2 text-zinc-500">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <EditRoleNameDialog role={role} onStatusUpdate={onStatusUpdate} />
            </TooltipTrigger>
            <TooltipContent className="opacity-70">
              <p>Renombrar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <EditRolePermissionsDialog
                role={role}
                onStatusUpdate={onStatusUpdate}
              />
            </TooltipTrigger>
            <TooltipContent className="opacity-70">
              <p>Modificar permisos</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  return null;
};

export default RoleListItemOptions;
