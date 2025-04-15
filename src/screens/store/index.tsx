import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTypedNavigation } from "@/hooks/useTypedNavigation";

const Store: React.FC = () => {
  const { navigate } = useTypedNavigation();

  return (
    <View style={styles.container}>
      <Text>Store</Text>
      <Pressable style={styles.button} onPress={() => navigate("Auth")}>
        <Text>Go to auth</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
  },
});

export default Store;
