import { IMenuItem } from "@/components/layout/bottom-menu/menu.interface";

export const menuItems: IMenuItem[] = [
  {
    icon: "explore",
    title: "Explore",
    path: "Explore",
  },
  {
    icon: "store",
    title: "Store",
    path: "Store",
  },
  {
    icon: "person",
    title: "Profile",
    path: "Profile",
    isAuth: true,
  },
  {
    icon: "settings-suggest",
    title: "Admin",
    path: "Admin",
    isAuth: true,
    isManager: true,
  },
];
