import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { API_URL } from "@/config/api.config";
import { RouteProp, useRoute } from "@react-navigation/native";
import { TypeRootStackParamList } from "@/navigation/navigation.types";
import { useQuery } from "@tanstack/react-query";
import { ProductService } from "@/services/product.service";
import Loader from "@/components/ui/loader";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Button from "@/components/ui/buttons/Button";
import { FontAwesome6 } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useAddToCart } from "@/hooks/useAddToCart";

const ProductDetails = () => {
  const route = useRoute<RouteProp<TypeRootStackParamList, "ProductDetails">>();
  const { productId } = route.params;

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => ProductService.getById(productId),
  });

  const { mutate: addToCart, isPending } = useAddToCart();

  const handleAdd = () => {
    if (product)
      addToCart(product.id, {
        onSuccess: () => {
          Toast.show({ type: "success", text1: "Added to bag" });
        },
        onError: () => {
          Toast.show({ type: "error", text1: "Error adding to cart" });
        },
      });
  };

  if (isLoading && !product) {
    return (
      <View className="flex-1 w-full h-full items-center justify-center">
        <Loader size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Image
          source={{ uri: `${API_URL}${product?.images[0]}` }}
          className="w-full h-64 bg-white border-b border-gray-200"
          resizeMode="contain"
        />
        <View className="p-6">
          <View className="flex-row justify-between items-start">
            <Text
              className="flex-1 text-base font-bold mb-2 mr-8"
              numberOfLines={2}
            >
              {product?.title}
            </Text>
            <Pressable>
              <MaterialCommunityIcons
                name="heart-outline"
                size={26}
                color="black"
              />
            </Pressable>
          </View>
          <Text className="text-base font-light text-gray-900 mb-4">
            € {product?.price}.00
          </Text>
          <View className="mb-6">
            <Text className="text-base font-semibold text-gray-800">About</Text>
            <Text className="text-xs text-gray-600">
              {product?.description || "No description."}
            </Text>
          </View>

          <View className="flex-col justify-between items-start mb-6">
            <Text className="text-base font-semibold text-gray-800 mb-1">
              Category
            </Text>
            <Text className="flex-1 text-sm text-white bg-blue-500 py-2 px-4 rounded-2xl">
              {product?.category?.title || "No category."}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-4 left-4 right-4">
        <Button handle={handleAdd} isPending={isPending}>
          <FontAwesome6 name="plus" size={16} color="white" />
          <Text className="text-white font-semibold text-sm ml-2">
            Add to bag
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default ProductDetails;
