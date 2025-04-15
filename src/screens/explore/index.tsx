import { Text, View } from "react-native";
import Layout from "@/components/layout";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import PopularProductsList from "@/screens/explore/PopularProductsList";
import { PromoBannerCarousel } from "@/screens/explore/PromoBannerCarousel";

const Explore: React.FC = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Layout
      style={{
        paddingBottom: bottom + 70,
      }}
    >
      <PromoBannerCarousel />

      <View className="px-4">
        <PopularProductsList />

        {/* Банер з доставкою */}
        <View className="bg-blue-50 p-4 rounded-xl mb-6">
          <View className="flex-row items-center">
            <View className="bg-blue-100 p-2 rounded-full mr-3">
              <MaterialCommunityIcons name="truck" size={24} color="#3B82F6" />
            </View>
            <View>
              <Text className="font-bold">Швидка доставка</Text>
              <Text className="text-gray-600 text-sm">
                По всій Україні 1-3 дні
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default Explore;
