import { MotiView } from "moti";
import { ScrollView, View } from "react-native";
import { Skeleton } from "moti/skeleton";

export const CategoriesSkeleton = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="py-5"
    >
      <MotiView
        className="flex-row mr-2"
        transition={{ type: "no-animation" }}
        animate={{ backgroundColor: "transparent" }}
      >
        {[...Array(5)].map((_, index) => (
          <View key={index} className="mr-2">
            <Skeleton
              width={100}
              height={30}
              colorMode="light"
              radius="round"
              backgroundColor="#EAEFF5"
            />
          </View>
        ))}
      </MotiView>
    </ScrollView>
  );
};
