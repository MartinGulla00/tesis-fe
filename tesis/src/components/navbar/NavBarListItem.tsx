import React from "react";
import { NavigationMenuLink } from "../ui/navigation-menu";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  to: string;
  icon?: React.ElementType;
};

function NavBarListItem({ title, to, icon: Icon }: Props) {
  return (
    <li key={title}>
      <NavigationMenuLink asChild>
        <Link
          to={to}
          className={
            " block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-zinc-100"
          }
        >
          <div className="flex text-sm font-medium leading-none whitespace-nowrap">
            {Icon && <Icon className="w-4 h-4 mr-3" />}
            {title}
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default NavBarListItem;
