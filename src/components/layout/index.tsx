import React, { PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";
import { clsx as cn } from "clsx";

interface ILayout {
  className?: string;
  style?: Object;
}

const Layout: React.FC<PropsWithChildren<ILayout>> = ({
  children,
  className,
  style,
}) => {
  return (
    <View className={cn("h-full w-full bg-white", className)} style={style}>
      <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
    </View>
  );
};

export default Layout;
