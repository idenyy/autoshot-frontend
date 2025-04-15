import React, { PropsWithChildren } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ICategory } from "@/types/category.interface";
import Loader from "@/components/ui/loader";
import { clsx as cn } from "clsx";

interface CategorySelectorProps {
  category: ICategory;
  onSelect: (cat: ICategory) => void;
  categories: ICategory[] | undefined;
  isLoading: boolean;
  style?: string;
}

const CategorySelector: React.FC<PropsWithChildren<CategorySelectorProps>> = ({
  category,
  onSelect,
  categories,
  isLoading,
  children,
  style,
}) => (
  <View>
    {children}
    {isLoading ? (
      <Loader size="small" />
    ) : (
      <View className="flex-row flex-wrap mb-2">
        {categories?.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onSelect(item)}
            className={cn(
              style,
              `${category.id === item.id ? "bg-blue-500" : "bg-gray-200"}`,
            )}
          >
            <Text
              className={cn(
                `${category.id === item.id ? "text-white" : "text-gray-700"}`,
              )}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    )}
  </View>
);

export default CategorySelector;
