import { request } from "@/services/api/request.api";
import { getOrdersUrl } from "@/config/api.config";
import { IOrder } from "@/types/order.interface";

export const OrderService = {
  async getAll(startDate?: string, endDate?: string) {
    return request<IOrder[]>({
      url: getOrdersUrl(""),
      method: "GET",
      params: startDate && endDate ? { startDate, endDate } : undefined,
    });
  },
};
