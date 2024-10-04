import {
  LuBadgeCheck,
  LuList,
  LuPlus,
  LuReceipt,
  LuSettings,
  LuUserCog,
  LuUsers,
} from "react-icons/lu";
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
    title: "Órdenes de pedido",
    icon: null,
    link: null,
    permissions: ["verOrdenesPedido", "verAutorizaciones"],
    subitems: [
      {
        title: "Nueva orden",
        link: paths.PO_NEW,
        icon: LuPlus,
        permissions: ["crearOrdenPedido"],
      },
      {
        title: "Listado",
        link: paths.PO_INDEX,
        icon: LuList,
        permissions: ["verOrdenesPedido"],
      },
      {
        title: "Autorizaciones",
        link: paths.AUTH_NOTES_INDEX,
        icon: CheckSquareIcon,
        permissions: ["verAutorizaciones"],
      },
    ],
  },
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
];
