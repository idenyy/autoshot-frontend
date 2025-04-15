import { request } from "@/services/api/request.api";
import { getStatisticsUrl } from "@/config/api.config";

export const AdminService = {
  async getSummary() {
    return request({
      url: getStatisticsUrl("/summary"),
      method: "GET",
    });
  },

  async getSalesLast7Days() {
    return request({
      url: getStatisticsUrl("/sales"),
      method: "GET",
    });
  },

  async getTopProducts() {
    return request({
      url: getStatisticsUrl("/top-product"),
      method: "GET",
    });
  },
};
