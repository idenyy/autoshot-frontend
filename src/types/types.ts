import { IUser } from "@/types/user.interface";

export type UserRole = "MANAGER" | "CLIENT";
export type OrderStatus = "PENDING" | "PAYED" | "CANCELED";

export enum EnumSecureStore {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
}

export enum EnumAsyncStorage {
  USER = "user",
}

export interface BaseEntity {
  id: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthResponse extends ITokens {
  user: IUser;
}
