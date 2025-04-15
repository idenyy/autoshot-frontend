import { ActivityIndicator } from "react-native";

interface LoaderProps {
  size?: number | "small" | "large" | undefined;
}

const Loader: React.FC<LoaderProps> = ({ size }) => {
  return <ActivityIndicator size={size} color="#3b82f6" />;
};

export default Loader;
