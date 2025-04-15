import { IProduct } from "./product.interface";
import { IUser } from "./user.interface";
import { OrderStatus } from "@/types/types";

export interface IOrderItem {
  id: string;
  quantity: number;
  price: number;
  product: IProduct;
  createdAt: string;
  updatedAt: string;
}

export interface IOrder {
  id: string;
  status: OrderStatus;
  total: number;
  user: IUser;
  items: IOrderItem[];
  createdAt: string;
  updatedAt: string;
}
