import { IProduct } from "@/types/product.interface";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { API_URL } from "@/config/api.config";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";

export const Product = ({
  item,
  onEdit,
}: {
  item: IProduct;
  onEdit: () => void;
}) => (
  <View className="flex-row bg-white pb-4 mb-4 border-b border-gray-300">
    {item.images && item.images?.length > 0 ? (
      <Image
        className="w-[90px] h-[100px] rounded-2xl mr-3"
        source={{ uri: `${API_URL}${item.images[0]}` }}
        resizeMode="cover"
      />
    ) : (
      <View className="w-[90px] h-[100px] rounded-2xl mr-3 bg-blue-50 items-center justify-center">
        <FontAwesome6 name="image" size={24} color="#B4DBFF" />
      </View>
    )}

    <View className="flex-1 justify-between py-2">
      <View>
        <Text className="text-sm font-semibold mb-0.5" numberOfLines={1}>
          {item.title}
        </Text>
        <Text className="text-xs text-gray-600" numberOfLines={1}>
          {item.description}
        </Text>
      </View>

      <View className="flex-row justify-between items-center mt-2">
        <TouchableOpacity
          onPress={onEdit}
          className="px-3 py-1 bg-blue-100 rounded-lg"
        >
          <Text className="text-blue-600 font-medium">Edit</Text>
        </TouchableOpacity>
        <Text className="text-sm font-bold text-gray-900">
          € {item.price}.00
        </Text>
      </View>
    </View>
  </View>
);
