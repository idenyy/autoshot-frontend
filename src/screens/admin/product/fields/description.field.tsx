import React from "react";
import { Text, TextInput, View } from "react-native";

interface DescriptionFieldProps {
  value: string;
  onChange: (val: string) => void;
}

const DescriptionField: React.FC<DescriptionFieldProps> = ({
  value,
  onChange,
}) => (
  <View>
    <Text className="text-base text-gray-900 px-1">Description</Text>
    <TextInput
      className="bg-gray-100 rounded-2xl py-4 px-4 mb-2 text-gray-900"
      value={value}
      onChangeText={onChange}
      placeholder="Description"
      keyboardType="default"
    />
  </View>
);

export default DescriptionField;
