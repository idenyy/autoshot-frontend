import React from "react";
import { Text, TextInput, View } from "react-native";

interface TitleFieldProps {
  value: string;
  onChange: (val: string) => void;
}

const TitleField: React.FC<TitleFieldProps> = ({ value, onChange }) => (
  <View>
    <Text className="text-base text-gray-900 px-1">Name</Text>
    <TextInput
      className="bg-gray-100 rounded-2xl py-4 px-4 mb-2 text-gray-900"
      value={value}
      onChangeText={onChange}
      placeholder="Title"
      keyboardType="default"
    />
  </View>
);

export default TitleField;
