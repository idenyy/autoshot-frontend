import React from "react";
import { Text, TextInput, View } from "react-native";

interface PriceFieldProps {
  value: string;
  onChange: (val: string) => void;
}

const PriceField: React.FC<PriceFieldProps> = ({ value, onChange }) => (
  <View>
    <Text className="text-base text-gray-900 px-1">Price</Text>
    <TextInput
      className="bg-gray-100 rounded-2xl py-4 px-4 mb-2 text-gray-900"
      value={value}
      onChangeText={onChange}
      placeholder="Price"
      keyboardType="numeric"
    />
  </View>
);

export default PriceField;
