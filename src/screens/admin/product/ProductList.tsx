import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFilters } from "@/providers/filter.provider";
import { ProductService } from "@/services/product.service";
import { SortButton } from "@/components/ui/buttons/sort-button";
import { Product } from "@/screens/admin/product/Product";
import { IProduct } from "@/types/product.interface";
import { ProductModal } from "@/screens/admin/product/ProductModal";
import ProductFields from "@/screens/admin/product/ProductFields";
import CategorySelector from "@/screens/admin/product/selectors/category.selector";
import SupplierSelector from "@/screens/admin/product/selectors/supplier.selector";
import { useGetAllCategories } from "@/hooks/useGetAllCategories";
import { useGetAllSuppliers } from "@/hooks/useGetAllSuppliers";
import { ICategory } from "@/types/category.interface";
import { ISupplier } from "@/types/supplier.interface";

export const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    category,
    supplier,
    searchTerm,
    sortBy,
    order,
    showFilters,
    setShowFilters,
    tempCategory,
    tempSupplier,
    setTempCategory,
    setTempSupplier,
    tempSearchTerm,
    setTempSearchTerm,
    toggleSort,
    applyFilters,
    resetFilters,
  } = useFilters();

  const queryClient = useQueryClient();

  const { data, isLoading, isFetched } = useQuery({
    queryKey: ["admin-product", searchTerm, category, supplier, sortBy, order],
    queryFn: () =>
      ProductService.getAll(searchTerm, category, supplier, sortBy, order),
  });

  const { categories, isLoading: isCategoriesLoading } = useGetAllCategories();
  const { suppliers, isLoading: isSuppliersLoading } = useGetAllSuppliers();

  const handleEdit = (product: IProduct) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleClose = () => {
    setShowFilters(false);
  };

  return (
    <>
      {showFilters && (
        <View className="bg-white p-4 rounded-lg shadow-md border border-gray-100 mb-4">
          <View className="flex-row justify-between">
            <Text className="text-base font-medium mb-2">Filters</Text>
            <Pressable onPress={handleClose}>
              <Text className="text-red-600">Close</Text>
            </Pressable>
          </View>
          <View className="mb-3">
            <Text className="text-base text-gray-900 mb-1">Search</Text>
            <TextInput
              className="border border-gray-400 rounded-lg py-3 px-2"
              placeholder="Search query"
              value={tempSearchTerm}
              onChangeText={setTempSearchTerm}
            />
          </View>

          <CategorySelector
            category={
              categories?.find((c) => c.id === tempCategory) ??
              ({} as ICategory)
            }
            onSelect={(selected) => setTempCategory(selected.id)}
            categories={categories}
            isLoading={isCategoriesLoading}
            style="px-3 py-1 mr-3 mb-2 justify-between rounded-lg"
          >
            <Text className="text-base text-gray-900 mb-1">Category</Text>
          </CategorySelector>

          <SupplierSelector
            supplier={
              suppliers?.find((s) => s.id === tempSupplier) ?? ({} as ISupplier)
            }
            onSelect={(selected) => setTempSupplier(selected.id)}
            suppliers={suppliers}
            isLoading={isSuppliersLoading}
            style="px-3 py-1 mr-3 mb-2 justify-between rounded-lg"
          >
            <Text className="text-base text-gray-900 mb-1">Supplier</Text>
          </SupplierSelector>

          <View className="mb-3">
            <Text className="text-base text-gray-900 mb-1">Sort by</Text>
            <View className="flex-row">
              <SortButton
                label="Price ↑"
                active={sortBy === "price" && order === "asc"}
                onPress={() => toggleSort("price", "asc")}
              />
              <SortButton
                label="Price ↓"
                active={sortBy === "price" && order === "desc"}
                onPress={() => toggleSort("price", "desc")}
              />
              <SortButton
                label="New"
                active={sortBy === "createdAt" && order === "desc"}
                onPress={() => toggleSort("createdAt", "desc")}
              />
              <SortButton
                label="Old"
                active={sortBy === "createdAt" && order === "asc"}
                onPress={() => toggleSort("createdAt", "asc")}
              />
            </View>
          </View>
          <View className="flex-row justify-between mt-2 space-x-2">
            <TouchableOpacity
              className="flex-1 p-2 bg-blue-100 rounded-lg items-center"
              onPress={applyFilters}
            >
              <Text className="text-blue-600">Apply</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 p-2 bg-red-100 rounded-lg items-center"
              onPress={resetFilters}
            >
              <Text className="text-red-600">Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {isLoading && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      )}

      {!isLoading && isFetched && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Product item={item} onEdit={() => handleEdit(item)} />
          )}
        />
      )}

      <ProductModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <View className="p-4">
          <Text className="text-xl text-center font-semibold mb-4">
            Edit Product
          </Text>
          {selectedProduct ? (
            <ProductFields
              product={selectedProduct}
              onClose={() => setModalVisible(false)}
              onUpdate={() => {
                queryClient.invalidateQueries({
                  queryKey: ["admin-product"],
                });
              }}
            />
          ) : (
            <View className="items-center justify-center py-8">
              <ActivityIndicator size="large" color="#3b82f6" />
            </View>
          )}
        </View>
      </ProductModal>
    </>
  );
};
