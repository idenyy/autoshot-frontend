import { Pressable, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  IMenuItem,
  TypeNavigate,
} from "@/components/layout/bottom-menu/menu.interface";

interface IMenuItemProps {
  item: IMenuItem;
  nav: TypeNavigate;
  currentRoute?: string;
}

const MenuItem: React.FC<IMenuItemProps> = ({ item, nav, currentRoute }) => {
  const isActive = currentRoute === item.path;

  return (
    <Pressable onPress={() => nav(item.path)} className="items-center w-[20%]">
      <MaterialIcons
        name={item.icon}
        size={26}
        color={isActive ? "#3b82f6" : "#9CA3AF"}
      />
      <Text
        className={`${isActive ? "text-gray-900 font-medium" : "text-gray-500"} mt-0.5`}
      >
        {item.title}
      </Text>
    </Pressable>
  );
};

export default MenuItem;
