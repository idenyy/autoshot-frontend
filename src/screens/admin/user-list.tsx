import React from "react";
import { FlatList, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { UserService } from "@/services/user.service";
import { IUser } from "@/types/user.interface";

export const UserList = () => {
  const { data, isLoading } = useQuery<IUser[]>({
    queryKey: ["admin-users"],
    queryFn: () => UserService.getAll(),
  });

  return (
    <View className="p-4">
      <Text className="text-xl font-bold mb-4">Користувачі</Text>
      <FlatList
        data={data || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-4 mb-2 rounded-xl shadow">
            <Text className="font-semibold">{item.name}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Роль: {item.role}</Text>
          </View>
        )}
      />
    </View>
  );
};
