import RnToast, { BaseToast, BaseToastProps } from "react-native-toast-message";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

interface CustomToastProps extends BaseToastProps {
  style?: StyleProp<ViewStyle>;
  text1Style?: StyleProp<TextStyle>;
  text2Style?: StyleProp<TextStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const getToastOptions = (primaryColor: string): Partial<CustomToastProps> => ({
  style: {
    backgroundColor: "#fff",
    borderLeftWidth: 5,
    borderLeftColor: primaryColor,
    borderRadius: 8,
    height: "auto",
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  text1Style: {
    color: "#262626",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  text2Style: {
    color: "#7C8BA0",
    fontSize: 14,
    fontWeight: "400",
  },
  contentContainerStyle: {
    paddingHorizontal: 0,
  },
});

const Toast: React.FC = () => {
  return (
    <RnToast
      topOffset={50}
      autoHide={true}
      visibilityTime={4000}
      config={{
        success: (props: BaseToastProps) => (
          <BaseToast {...props} {...getToastOptions("#10B981")} />
        ),
        info: (props: BaseToastProps) => (
          <BaseToast {...props} {...getToastOptions("#3B82F6")} />
        ),
        error: (props: BaseToastProps) => (
          <BaseToast {...props} {...getToastOptions("#EF4444")} />
        ),
      }}
    />
  );
};

export default Toast;
