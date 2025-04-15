import { ComponentType } from "react";

export type TypeRootStackParamList = {
  Auth: undefined;
  Explore: undefined;
  Cart: undefined;
  Favorites: undefined;
  Store: undefined;
  Admin: undefined;
  Profile: undefined;
  ProductDetails: { productId: string };
};

export interface IRoute {
  name: keyof TypeRootStackParamList;
  component: ComponentType;
  headerShown: boolean;
  customHeader?: boolean;
}
