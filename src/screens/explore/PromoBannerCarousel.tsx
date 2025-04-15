import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

const promotions = [
  {
    id: "1",
    title: "Promotion -30% on transmission",
    image: require("../../../assets/logo-white.png"),
  },
  {
    id: "2",
    title: "Free oil change with service",
    image: require("../../../assets/logo-white.png"),
  },
];

export const PromoBannerCarousel: React.FC = () => {
  return (
    <Carousel
      loop
      width={width}
      height={200}
      // autoPlay
      data={promotions}
      scrollAnimationDuration={3000}
      renderItem={({ item }) => (
        <View className="h-full bg-blue-500 overflow-hidden border-l border-white items-center justify-center px-4">
          <Image
            source={item.image}
            className="w-24 h-24 opacity-80 mb-2"
            resizeMode="contain"
          />
          <Text className="text-white font-bold text-xl text-center mb-2">
            {item.title}
          </Text>
          <TouchableOpacity className="bg-white py-2 px-4 rounded-lg">
            <Text className="text-blue-500 font-semibold">More details</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};
