import { request } from "@/services/api/request.api";
import { getProductsUrl } from "@/config/api.config";
import { IProduct, IUpdateProduct } from "@/types/product.interface";
import { SortOrder } from "@/types/filter.interface";

export const ProductService = {
  async getAll(
    searchTerm?: string,
    category?: string,
    supplier?: string,
    sortBy?: string,
    order?: SortOrder,
  ): Promise<IProduct[]> {
    return request<IProduct[]>({
      url: getProductsUrl(""),
      method: "GET",
      params: {
        searchTerm,
        category,
        supplier,
        sortBy,
        order,
      },
    });
  },

  async getById(productId: string): Promise<IProduct> {
    return request<IProduct>({
      url: getProductsUrl(`/${productId}`),
      method: "GET",
    });
  },

  async getPopular(limit?: string): Promise<IProduct[]> {
    return request<IProduct[]>({
      url: getProductsUrl("/popular"),
      method: "GET",
      params: limit,
    });
  },

  async create(data: Partial<IProduct>) {
    return request<IProduct>({
      url: getProductsUrl(""),
      method: "POST",
      data: data,
    });
  },

  async update(productId: string, data: Partial<IUpdateProduct>) {
    return request<IProduct>({
      url: getProductsUrl(`/${productId}`),
      method: "PUT",
      data,
    });
  },

  async delete(productId: string) {
    return request({
      url: getProductsUrl(`/${productId}`),
      method: "DELETE",
    });
  },
};
