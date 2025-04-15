import { Keyboard, Platform, Pressable, View, ViewProps } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const KeyboardView: React.FC<ViewProps> = ({ children, ...props }) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraHeight={50}
      enableAutomaticScroll={Platform.OS === "ios"}
    >
      <Pressable
        onPress={() => Keyboard.dismiss()}
        style={{ flex: 1 }}
        accessible={false}
      >
        <View {...props}>{children}</View>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

export default KeyboardView;
