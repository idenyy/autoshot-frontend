import { BaseEntity, UserRole } from "./types";

export interface IAuthData {
  email: string;
  password: string;
  name?: string;
}

export interface User extends BaseEntity {
  email: string;
  name: string;
  password?: string;
  picture?: string;
  role?: UserRole;
}
