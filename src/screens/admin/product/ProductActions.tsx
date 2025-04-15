import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Loader from "@/components/ui/loader";

interface Props {
  isSaving: boolean;
  isDeleting: boolean;
  isEditMode: boolean;
  onSave: () => void;
  onDelete: () => void;
}

const ProductActions: React.FC<Props> = ({
  isSaving,
  isDeleting,
  isEditMode,
  onSave,
  onDelete,
}) => (
  <View className="flex-row justify-between mt-2 space-x-2">
    <TouchableOpacity
      onPress={onSave}
      className="flex-1 p-2 bg-blue-100 rounded-lg items-center"
      disabled={isSaving}
    >
      {isSaving ? (
        <Loader size="small" />
      ) : (
        <Text className="text-blue-600 text-sm font-semibold">Save</Text>
      )}
    </TouchableOpacity>

    {isEditMode && (
      <TouchableOpacity
        onPress={onDelete}
        className="flex-1 p-2 bg-red-100 rounded-lg items-center"
      >
        {isDeleting ? (
          <Loader size="small" />
        ) : (
          <Text className="text-red-600 text-sm font-semibold">Delete</Text>
        )}
      </TouchableOpacity>
    )}
  </View>
);

export default ProductActions;
