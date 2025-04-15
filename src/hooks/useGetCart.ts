import { useQuery } from "@tanstack/react-query";
import { CartService } from "@/services/cart.service";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => CartService.getCart(),
  });
};
