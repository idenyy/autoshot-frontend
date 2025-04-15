import { request } from "@/services/api/request.api";
import { getCategoriesUrl } from "@/config/api.config";
import { ICategory } from "@/types/category.interface";

export const CategoryService = {
  async getAll() {
    return request<ICategory[]>({
      url: getCategoriesUrl(""),
      method: "GET",
    });
  },

  async getById(id: string) {
    return request<ICategory>({
      url: getCategoriesUrl(`/${id}`),
      method: "GET",
    });
  },
};
