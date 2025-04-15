import { PropsWithChildren } from "react";
import { Text } from "react-native";
import { clsx as cn } from "clsx";

interface IHeading {
  isCenter?: boolean;
  className?: string;
}

const Heading: React.FC<PropsWithChildren<IHeading>> = ({
  children,
  className,
  isCenter = false,
}) => {
  return (
    <Text
      className={cn(
        "text-gray-900 font-medium text-xl",
        isCenter && "text-center",
        className,
      )}
    >
      {children}
    </Text>
  );
};

export default Heading;
