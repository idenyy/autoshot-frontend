import { request } from "@/services/api/request.api";
import { getSuppliersUrl } from "@/config/api.config";
import { ISupplier } from "@/types/supplier.interface";

export const SupplierService = {
  async getAll() {
    return request<ISupplier[]>({
      url: getSuppliersUrl(""),
      method: "GET",
    });
  },
};
