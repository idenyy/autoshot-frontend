import { IRoute } from "@/navigation/navigation.types";
import Explore from "@/screens/explore";
import Cart from "@/screens/cart";
import Favorites from "@/screens/favorites";
import Profile from "@/screens/profile";
import Admin from "@/screens/admin";
import Store from "@/screens/store";
import ProductDetails from "@/screens/explore/ProductDetails";

export const routes: IRoute[] = [
  {
    name: "Explore",
    component: Explore,
    headerShown: true,
    customHeader: true,
  },
  {
    name: "Cart",
    component: Cart,
    headerShown: true,
  },
  {
    name: "Favorites",
    component: Favorites,
    headerShown: true,
  },
  {
    name: "Store",
    component: Store,
    headerShown: false,
  },
  {
    name: "Profile",
    component: Profile,
    headerShown: true,
  },
  {
    name: "Admin",
    component: Admin,
    headerShown: false,
  },
  {
    name: "ProductDetails",
    component: ProductDetails,
    headerShown: true,
  },
];
