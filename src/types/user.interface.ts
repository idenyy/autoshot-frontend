import { User } from "@/types/auth.interface";
import { ICartItem } from "@/types/cart.interface";

export interface IUser extends User {
  favorites?: any;
  reviews?: any;
  orders?: any;
  cart?: ICartItem[];
}
