import { request } from "@/services/api/request.api";
import { getCartUrl } from "@/config/api.config";
import { ICart } from "@/types/cart.interface";

export const CartService = {
  async add(productId: string) {
    return request({
      url: getCartUrl("/items"),
      method: "POST",
      data: { productId },
    });
  },

  async getCart(): Promise<ICart> {
    return request<ICart>({
      url: getCartUrl(""),
      method: "GET",
    });
  },

  async updateQuantity(productId: string, quantity: number) {
    return request({
      url: `/cart/items/${productId}`,
      method: "PATCH",
      data: { quantity },
    });
  },

  async removeItem(productId: string) {
    return request({
      url: getCartUrl(`/items/${productId}`),
      method: "DELETE",
    });
  },
};
