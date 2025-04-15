import React, { PropsWithChildren } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ISupplier } from "@/types/supplier.interface";
import Loader from "@/components/ui/loader";
import { clsx as cn } from "clsx";

interface SupplierSelectorProps {
  supplier: ISupplier;
  onSelect: (s: ISupplier) => void;
  suppliers: ISupplier[] | undefined;
  isLoading: boolean;
  style?: string;
}

const SupplierSelector: React.FC<PropsWithChildren<SupplierSelectorProps>> = ({
  supplier,
  onSelect,
  suppliers,
  children,
  isLoading,
  style,
}) => (
  <View>
    {children}
    {isLoading ? (
      <Loader size="small" />
    ) : (
      <View className="flex-row flex-wrap mb-2">
        {suppliers?.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onSelect(item)}
            className={cn(
              style,
              `${supplier.id === item.id ? "bg-blue-500" : "bg-gray-200"}`,
            )}
          >
            <Text
              className={
                supplier.id === item.id ? "text-white" : "text-gray-700"
              }
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    )}
  </View>
);

export default SupplierSelector;
