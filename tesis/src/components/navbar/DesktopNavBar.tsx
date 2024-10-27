import { Link } from "react-router-dom";
import { LuReceipt, LuStore, LuTruck, LuWarehouse } from "react-icons/lu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import * as paths from "@/routing/paths";
// import logo from "@/assets/logo.png";
import { UserMenu } from "../user-menu/user-menu";
import { navData } from "./navData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ResourceRole } from "@/types/resource";
import NavBarListItem from "./NavBarListItem";
import { getAuthDetails } from "@/utils/authStorage";

export function DesktopNavBar() {
  const authState = getAuthDetails();

  const checkPermission = (itemPermissions?: string[]) => {
    return itemPermissions
      ? authState?.permissions?.some((perm: ResourceRole) =>
          itemPermissions.includes(perm.resourceId?.name)
        )
      : true;
  };

  return (
    <div className="flex justify-center items-center w-full border-b-2 border-zinc-300">
      <div className="flex justify-between w-full bg-zinc-200 dark:bg-zinc-800">
        <div className="ml-10 flex items-center space-x-4">
          <Link to={paths.LANDING}>
            {/* <img src={logo} alt="Logo de la empresa" className="w-20 h-auto" /> */}
          </Link>
        </div>
        <div className="mr-10 flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              {navData.map((item) => {
                if (checkPermission(item.permissions)) {
                  if (item.subitems === null) {
                    return (
                      <NavigationMenuItem key={item.title}>
                        <Link to={item.link}>
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                          >
                            {item.title}
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    );
                  } else {
                    return (
                      <Popover key={item.title}>
                        <PopoverTrigger asChild>
                          <Button variant="ghost">
                            {item.title} <ChevronDownIcon className="ml-2" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-min text-zinc-800">
                          <ul>
                            {item.subitems
                              .filter((subitem) =>
                                checkPermission(subitem.permissions)
                              )
                              .map((subitem) => (
                                <NavBarListItem
                                  key={subitem.title}
                                  to={subitem.link}
                                  title={subitem.title}
                                  icon={subitem.icon}
                                />
                              ))}
                          </ul>
                        </PopoverContent>
                      </Popover>
                    );
                  }
                }
                return null;
              })}
            </NavigationMenuList>
          </NavigationMenu>
          {/* <ModeToggle /> */}
          <UserMenu />
        </div>
      </div>
    </div>
  );
}
