import { request } from "@/services/api/request.api";
import { IUser } from "@/types/user.interface";
import { getUserUrl } from "@/config/api.config";

export const UserService = {
  async getAll() {
    return request<IUser[]>({
      url: getUserUrl("/all"),
      method: "GET",
    });
  },

  async getProfile() {
    return request<IUser>({
      url: getUserUrl("/profile"),
      method: "GET",
    });
  },

  async toggleFavorite(productId: string) {
    return request<IUser>({
      url: getUserUrl(`/profile/favorites/${productId}`),
      method: "PATCH",
    });
  },
};
