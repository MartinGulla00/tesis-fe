import { LuList, LuPlus, LuUserCog, LuUsers } from "react-icons/lu";
import * as paths from "@/routing/paths";
import { CheckSquareIcon } from "lucide-react";

interface NavItemData {
  title: string;
  icon: any | null;
  link: string | null;
  permissions?: string[];
  subitems?: NavItemData[] | null;
}

export const navData: NavItemData[] = [
  {
    title: "Definiciones",
    icon: null,
    link: null,
    permissions: ["verUsuarios", "verRoles"],
    subitems: [
      {
        title: "Usuarios",
        link: paths.DEF_USERS,
        icon: LuUsers,
        permissions: ["verUsuarios"],
      },
      {
        title: "Roles",
        link: paths.DEF_ROLES,
        icon: LuUserCog,
        permissions: ["verRoles"],
      },
    ],
  },
  {
    title: "Chat",
    icon: null,
    link: paths.APP,
    permissions: null,
    subitems: null,
  },
];
