import { PropsWithChildren } from "react";
import { IButton } from "@/components/ui/buttons/button.interface";
import { Pressable, Text } from "react-native";
import { clsx as cn } from "clsx";

const ButtonBeta: React.FC<PropsWithChildren<IButton>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <Pressable
      className={cn("self-center rounded-2xl w-full py-4", className)}
      {...rest}
    >
      <Text className="text-white text-center font-medium text-base">
        {children}
      </Text>
    </Pressable>
  );
};

export default ButtonBeta;
