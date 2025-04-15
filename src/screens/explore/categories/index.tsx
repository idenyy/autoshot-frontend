import { ScrollView, Text, TouchableOpacity } from "react-native";
import { CategoriesSkeleton } from "@/components/skeletons/categories.skeleton";
import { useGetAllCategories } from "@/hooks/useGetAllCategories";
import { PropsWithChildren } from "react";
import { clsx as cn } from "clsx";

interface CategoriesProps {
  className?: string;
}

const Categories: React.FC<PropsWithChildren<CategoriesProps>> = ({
  children,
  className,
}) => {
  const { categories, isLoading } = useGetAllCategories();

  if (isLoading) return <CategoriesSkeleton />;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className={cn(`flex-row flex-wrap py-4`, className)}
    >
      {categories?.map((item) => (
        <TouchableOpacity
          className="px-4 py-2 bg-blue-500 mr-2 rounded-full"
          key={item.id}
        >
          <Text className="text-xs font-semibold text-center uppercase text-gray-200">
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Categories;
