import React from "react";
import { Text, View } from "react-native";
import { useCart } from "@/hooks/useGetCart";

const CartBadge = () => {
  const { data, isLoading } = useCart();

  const itemsCount =
    data?.cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  if (isLoading || itemsCount === 0) return null;

  return (
    <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
      <Text className="text-white text-xs font-bold">{itemsCount}</Text>
    </View>
  );
};

export default CartBadge;
