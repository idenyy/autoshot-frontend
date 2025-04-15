import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import {
  filterMenuItems,
  TypeNavigate,
} from "@/components/layout/bottom-menu/menu.interface";
import { menuItems } from "@/components/layout/bottom-menu/menu.data";
import MenuItem from "@/components/layout/bottom-menu/menu-item";
import { useAuth } from "@/hooks/useAuth";

interface IBottomMenuProps {
  nav: TypeNavigate;
  currentRoute?: string;
}

const BottomMenu: React.FC<IBottomMenuProps> = (props) => {
  const { user, isManager } = useAuth();
  const { bottom } = useSafeAreaInsets();

  const filteredItems = filterMenuItems(menuItems, user, isManager);

  return (
    <View
      className="pt-4 px-2 flex-row justify-between items-center w-full bg-white"
      style={{
        paddingBottom: bottom,
      }}
    >
      {filteredItems.map((item) => (
        <MenuItem key={item.path} item={item} {...props} />
      ))}
    </View>
  );
};

export default BottomMenu;
