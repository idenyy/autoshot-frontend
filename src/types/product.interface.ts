export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  categoryId: string;
  supplierId: string;
  category?: {
    id: string;
    title: string;
  };
  supplier?: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ICreateProduct {
  title: string;
  description: string;
  price: number;
  images?: string[];
  categoryId: string;
}

export interface IUpdateProduct {
  title?: string;
  description?: string;
  price?: number;
  images?: string[];
  categoryId?: string;
  supplierId?: string;
}
