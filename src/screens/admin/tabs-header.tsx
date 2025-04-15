import React, { PropsWithChildren } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useFilters } from "@/providers/filter.provider";
import { FontAwesome6 } from "@expo/vector-icons";

interface TabsHeaderProps {
  title: string | undefined;
}

export const TabsHeader: React.FC<PropsWithChildren<TabsHeaderProps>> = ({
  children,
  title,
}) => {
  const { setShowFilters, showFilters } = useFilters();

  return (
    <View className="flex-row items-center justify-between mb-4">
      <Text className="text-xl font-semibold">{title}</Text>
      <View className="flex-row gap-3">
        {children}

        <TouchableOpacity
          className="p-2 bg-gray-100 rounded-lg"
          onPress={() => setShowFilters(!showFilters)}
        >
          <FontAwesome6 name="filter" size={20} color="#3b82f6" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
