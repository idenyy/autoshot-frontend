import React from "react";
import { FlatList, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { OrderService } from "@/services/order.service";
import { IOrder } from "@/types/order.interface";
import { format } from "date-fns";

interface Props {
  startDate?: string;
  endDate?: string;
}

export const OrderList: React.FC<Props> = ({ startDate, endDate }) => {
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery<IOrder[]>({
    queryKey: ["orders", startDate, endDate],
    queryFn: () => OrderService.getAll(startDate, endDate),
    enabled: true,
  });

  if (isLoading)
    return <Text className="text-center text-gray-500">Завантаження...</Text>;

  if (isError)
    return (
      <Text className="text-center text-red-500">Помилка при завантаженні</Text>
    );

  if (!orders || orders.length === 0)
    return (
      <Text className="text-center text-gray-400">Замовлень не знайдено</Text>
    );

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="bg-white p-4 rounded-2xl shadow">
          <Text className="text-lg font-semibold">
            Користувач: {item.user.name}
          </Text>
          <Text className="text-sm text-gray-600">
            Email: {item.user.email}
          </Text>
          <Text className="text-sm mt-1">
            Статус: <Text className="font-medium">{item.status}</Text>
          </Text>
          <Text className="text-sm">
            Сума: <Text className="font-medium">₴{item.total}</Text>
          </Text>
          <Text className="text-xs text-gray-500 mt-2">
            {format(new Date(item.createdAt), "dd.MM.yyyy HH:mm")}
          </Text>
        </View>
      )}
    />
  );
};
