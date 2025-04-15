import { Pressable, Text } from "react-native";
import { ICheckbox } from "@/components/ui/checkbox/checkbox.interface";

const Checkbox = ({ value, onValueChange, className }: ICheckbox) => {
  return (
    <Pressable
      onPress={() => onValueChange(!value)}
      className={`w-6 h-6 bg-gray-100 rounded-md items-center justify-center mr-[14px] ${
        value && "bg-blue-500"
      } ${className}`}
    >
      {value && <Text className="text-white">✓</Text>}
    </Pressable>
  );
};

export default Checkbox;
