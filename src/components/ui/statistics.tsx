import { ActivityIndicator, Text, View } from "react-native";

export const StatisticsBlock = ({ stats, isLoading }: any) => {
  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View className="bg-gray-100 p-4 rounded-xl my-5">
      <Text className="text-xl font-semibold mb-2">Загальна статистика</Text>
      <View className="flex-row justify-between mb-2">
        <Text>Користувачів:</Text>
        <Text className="font-bold">{stats?.users}</Text>
      </View>
      <View className="flex-row justify-between mb-2">
        <Text>Товарів:</Text>
        <Text className="font-bold">{stats?.products}</Text>
      </View>
      <View className="flex-row justify-between mb-2">
        <Text>Замовлень:</Text>
        <Text className="font-bold">{stats?.orders}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text>Прибуток:</Text>
        <Text className="font-bold">{stats?.revenue} $</Text>
      </View>
    </View>
  );
};
