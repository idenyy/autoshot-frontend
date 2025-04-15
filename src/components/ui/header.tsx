import { useState } from "react";
import { useTypedNavigation } from "@/hooks/useTypedNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import CartBadge from "@/screens/cart/CartBadge";

const Header: React.FC = () => {
  const { navigate } = useTypedNavigation();
  const [searchText, setSearchText] = useState("");

  const handleClearSearch = () => {
    setSearchText("");
  };

  return (
    <SafeAreaView edges={["top"]} className="bg-white">
      <View className="flex-row items-center justify-between px-5 pb-5 pt-2">
        <View className="flex-row items-center flex-1 mr-3 bg-gray-100 rounded-lg pl-2 pr-3 py-2">
          {searchText ? (
            <TouchableOpacity onPress={handleClearSearch}>
              <Ionicons name="close" size={20} color="gray" />
            </TouchableOpacity>
          ) : (
            <Ionicons name="search" size={20} color="gray" />
          )}
          <TextInput
            placeholder="Search..."
            className="flex-1 pl-1"
            placeholderTextColor="gray"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <View className="flex-row items-center space-x-2">
          <TouchableOpacity onPress={() => navigate("Favorites")}>
            <MaterialCommunityIcons
              name="heart-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate("Cart")}>
            <MaterialCommunityIcons
              name="shopping-outline"
              size={24}
              color="black"
            />
            <CartBadge />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
