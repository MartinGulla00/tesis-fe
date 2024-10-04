import { Link } from "react-router-dom";
import * as paths from "@/routing/paths";
// import logo from "@/assets/logo.png";
import { UserMenu } from "../user-menu/user-menu";
import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Cross1Icon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { navData } from "./navData";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { ResourceRole } from "@/types/resource";

export function TabletNavBar() {
  const authState = useSelector((state: RootState) => state.auth.value);

  const checkPermission = (itemPermissions?: string[]) => {
    return itemPermissions
      ? authState?.permissions?.some((perm: ResourceRole) =>
          itemPermissions.includes(perm.resourceId.name)
        )
      : true;
  };

  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const subItemsRefs = useRef<{ [key: string]: HTMLUListElement | null }>({});

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    // attach listener only when the menu is open
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    // cleanup when menu is closed
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const toggleSubItems = (title: string) => {
    setActiveItem(activeItem === title ? null : title);
  };
  useEffect(() => {
    Object.keys(subItemsRefs.current).forEach((key) => {
      const el = subItemsRefs.current[key];
      if (el) {
        el.style.height = activeItem === key ? `${el.scrollHeight}px` : "0";
      }
    });
  }, [activeItem]);

  return (
    <div className="flex justify-center items-center w-full border-b-2 border-zinc-300">
      <div className="flex justify-between w-full bg-zinc-200 dark:bg-zinc-800">
        <div className="ml-10 flex items-center space-x-4">
          <Link to={paths.LANDING}>
            {/* <img
              src={logo}
              alt="Logo de la empresa"
              className="w-16 mt-2 h-auto"
            /> */}
          </Link>
        </div>
        <div className="mr-10 flex items-center space-x-6">
          <UserMenu />
          <button onClick={toggleMenu}>
            <HamburgerMenuIcon className="w-6 h-6" />
          </button>
          <div
            ref={menuRef}
            className={`fixed z-50 top-0 right-0 w-[300px] h-full bg-white dark:bg-zinc-800 transform ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex w-full items-center justify-end mb-6">
              <button onClick={toggleMenu} className="mr-6 mt-4">
                <Cross1Icon className="w-6 h-6" />
              </button>
            </div>
            <ul>
              {navData.map((item) => {
                if (checkPermission(item.permissions)) {
                  return (
                    <div key={item.title} className="px-2">
                      <li
                        className={`font-medium rounded-lg ${
                          activeItem === item.title ? "bg-gray-200" : ""
                        }`}
                        onClick={() =>
                          item.subitems
                            ? toggleSubItems(item.title)
                            : setMenuOpen(false)
                        }
                      >
                        <Link
                          to={item.link || "#"}
                          className="flex items-center justify-between p-4"
                        >
                          {item.title}
                          {item.subitems &&
                            (activeItem === item.title ? (
                              <ChevronUpIcon className="ml-2" />
                            ) : (
                              <ChevronDownIcon className="ml-2" />
                            ))}
                        </Link>
                      </li>
                      {item.subitems && (
                        <ul
                          ref={(el) => (subItemsRefs.current[item.title] = el)}
                          className="overflow-hidden transition-height duration-500 ease-in-out"
                          style={{ height: "0" }}
                        >
                          {item.subitems
                            .filter((subitem) =>
                              checkPermission(subitem.permissions)
                            )
                            .map((subitem) => (
                              <li key={subitem.title}>
                                <Link
                                  to={subitem.link}
                                  className="flex items-center p-2 pl-8"
                                >
                                  {subitem.icon &&
                                    React.createElement(subitem.icon, {
                                      className: "w-4 h-4 mr-3",
                                    })}
                                  {subitem.title}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
