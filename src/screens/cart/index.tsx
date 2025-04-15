import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CartService } from "@/services/cart.service";
import { API_URL } from "@/config/api.config";
import Button from "@/components/ui/buttons/Button";
import { FontAwesome6 } from "@expo/vector-icons";

const CartScreen = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => CartService.getCart(),
  });

  const { mutate: addItem } = useMutation({
    mutationFn: CartService.add,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const { mutate: updateQuantity } = useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => CartService.updateQuantity(productId, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const { mutate: removeItem } = useMutation({
    mutationFn: CartService.removeItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (!data || !data.cartItems?.length) {
    return (
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-lg font-semibold text-center text-gray-700">
          Ваша корзина пуста
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView className="p-4 space-y-4">
        {data.cartItems.map((item: any) => (
          <View
            key={item.id}
            className="flex-row items-center bg-white p-3 rounded-xl border border-gray-200"
          >
            <Image
              source={{ uri: `${API_URL}${item.product.images[0]}` }}
              className="w-16 h-16 rounded-md bg-white mr-3"
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text className="font-semibold text-sm text-gray-900">
                {item.product.title}
              </Text>
              <Text className="text-sm text-gray-600">
                € {item.product.price}
              </Text>
              <Pressable
                onPress={() => {
                  if (item.quantity <= 1) {
                    removeItem(item.product.id);
                  } else {
                    updateQuantity({
                      productId: item.product.id,
                      quantity: item.quantity - 1,
                    });
                  }
                }}
                className="px-2 py-1 bg-gray-200 rounded-full"
              >
                <Text>-</Text>
              </Pressable>
              <Text>{item.quantity}</Text>
              <Pressable
                onPress={() =>
                  updateQuantity({
                    productId: item.product.id,
                    quantity: item.quantity + 1,
                  })
                }
                className="px-2 py-1 bg-gray-200 rounded-full"
              >
                <Text>+</Text>
              </Pressable>
            </View>
            <Pressable
              onPress={() => removeItem(item.product.id)}
              className="ml-2"
            >
              <FontAwesome6 name="trash" size={18} color="#ef4444" />
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <View className="absolute bottom-4 left-4 right-4">
        <Button>
          <Text className="text-white font-semibold text-sm ml-2">
            Checkout
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default CartScreen;
