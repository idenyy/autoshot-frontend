import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CartService } from "@/services/cart.service";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => CartService.add(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
