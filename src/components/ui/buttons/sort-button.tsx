import { Text, TouchableOpacity } from "react-native";
import React from "react";

export const SortButton = ({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    className={`px-3 py-1 mr-3 justify-between rounded-md ${active ? "bg-blue-100" : "bg-gray-200"}`}
    onPress={onPress}
  >
    <Text className={active ? "text-blue-600" : "text-gray-700"}>{label}</Text>
  </TouchableOpacity>
);
