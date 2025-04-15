export interface ICartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    title: string;
    description: string;
    price: number;
    images: string[];
  };
}

export interface ICart {
  id: string;
  cartItems: ICartItem[];
}
