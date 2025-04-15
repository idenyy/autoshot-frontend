import { ActivityIndicator, Pressable, View } from "react-native";
import React, { PropsWithChildren } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { clsx as cn } from "clsx";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface AddButtonProps {
  className?: string;
  handle?: () => void;
  isPending?: boolean;
}

const Button: React.FC<PropsWithChildren<AddButtonProps>> = ({
  handle,
  isPending,
  children,
  className,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPress = () => {
    scale.value = withSpring(0.95, { damping: 5 }, () => {
      scale.value = withSpring(1);
    });

    handle?.();
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      style={[animatedStyle]}
      className={cn(
        `bg-blue-500 py-4 rounded-2xl items-center justify-center`,
        className,
      )}
    >
      {isPending ? (
        <ActivityIndicator color="white" />
      ) : (
        <View className="flex-row justify-center items-center">{children}</View>
      )}
    </AnimatedPressable>
  );
};

export default Button;
