import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { ProductService } from "@/services/product.service";
import { API_URL } from "@/config/api.config";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TypeRootStackParamList } from "@/navigation/navigation.types";

const PopularProductsList = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<TypeRootStackParamList>>();

  const { data, isLoading, isFetched } = useQuery({
    queryKey: ["popular-products"],
    queryFn: () => ProductService.getAll(),
  });

  return (
    <>
      {isLoading && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      )}

      {!isLoading && isFetched && (
        <>
          <View className="w-full flex-row justify-between px-2 mt-6 mb-3">
            <Text className="text-base font-bold text-gray-900">Popular</Text>
            <Pressable>
              <Text className="text-xs font-semibold text-blue-500">
                See more
              </Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="space-x-4"
          >
            {data?.map((product, index) => (
              <Pressable
                key={index}
                className="w-[200px] h-[190px] bg-gray-100 border border-gray-100 rounded-2xl mb-10"
                onPress={() =>
                  navigation.navigate("ProductDetails", {
                    productId: product.id,
                  })
                }
              >
                {product.images.length > 0 ? (
                  <Image
                    className="w-full h-28 bg-white rounded-t-2xl"
                    source={{ uri: `${API_URL}${product.images[0]}` }}
                    resizeMode="contain"
                  />
                ) : (
                  <View className="w-full h-28 bg-blue-100 rounded-t-2xl items-center justify-center">
                    <FontAwesome6 name="image" size={24} color="#B4DBFF" />
                  </View>
                )}
                <View className="flex-col items-start p-4 space-y-1">
                  <Text className="text-sm text-gray-800" numberOfLines={1}>
                    {product.title}
                  </Text>
                  <Text className="text-sm text-gray-800 font-bold">
                    € {product.price}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </>
      )}
    </>
  );
};

export default PopularProductsList;
