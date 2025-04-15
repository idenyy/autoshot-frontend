import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text } from "react-native";
import { IProduct, IUpdateProduct } from "@/types/product.interface";
import { useGetAllCategories } from "@/hooks/useGetAllCategories";
import { ProductService } from "@/services/product.service";
import { ICategory } from "@/types/category.interface";
import { useGetAllSuppliers } from "@/hooks/useGetAllSuppliers";
import { ISupplier } from "@/types/supplier.interface";

import ProductActions from "./ProductActions";
import TitleField from "@/screens/admin/product/fields/title.field";
import DescriptionField from "@/screens/admin/product/fields/description.field";
import PriceField from "@/screens/admin/product/fields/price.field";
import CategorySelector from "@/screens/admin/product/selectors/category.selector";
import SupplierSelector from "@/screens/admin/product/selectors/supplier.selector";
import Toast from "@/components/ui/toast";

interface ProductFieldsProps {
  product?: IProduct;
  onClose: () => void;
  onUpdate: (updatedOrCreated: IProduct | null) => void;
}

const ProductFields: React.FC<ProductFieldsProps> = ({
  product,
  onClose,
  onUpdate,
}) => {
  const isEditMode = !!product;

  const { categories, isLoading: isCategoriesLoading } = useGetAllCategories();
  const { suppliers, isLoading: isSuppliersLoading } = useGetAllSuppliers();

  const [title, setTitle] = useState(product?.title ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [category, setCategory] = useState<ICategory>({} as ICategory);
  const [supplier, setSupplier] = useState<ISupplier>({} as ISupplier);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (product && categories && categories.length > 0) {
      const foundCategory = categories.find((c) => c.id === product.categoryId);
      if (foundCategory) setCategory(foundCategory);
    }
  }, [categories, product]);

  useEffect(() => {
    if (product && suppliers && suppliers.length > 0) {
      const foundSupplier = suppliers.find((s) => s.id === product.supplierId);
      if (foundSupplier) setSupplier(foundSupplier);
    }
  }, [suppliers, product]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const fields: IUpdateProduct = {
        title,
        description,
        price: +price,
        categoryId: category.id,
        supplierId: supplier.id,
      };

      let result: IProduct;
      if (isEditMode && product) {
        await ProductService.update(product.id, fields);
        Toast("Product updated successfully");
        result = { ...product, ...fields };
      } else result = await ProductService.create(fields);

      onUpdate(result);
      onClose();
    } catch (error) {
      Toast("Failed to save product:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    if (!product) return;

    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this product?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setIsDeleting(true);
            try {
              await ProductService.delete(product.id);
              Toast("Product deleted successfully");
              onUpdate(null);

              onClose();
            } catch (error) {
              console.error("Failed to delete product:", error);
              Toast("Failed to delete product:", error);
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <ScrollView>
      <TitleField value={title} onChange={setTitle} />

      <DescriptionField value={description} onChange={setDescription} />

      <PriceField value={price} onChange={setPrice} />

      <CategorySelector
        category={category}
        onSelect={setCategory}
        categories={categories}
        isLoading={isCategoriesLoading}
        style="px-4 py-2 mr-2 mb-2 rounded-lg"
      >
        <Text className="text-base text-gray-900 px-1 mb-2">Category</Text>
      </CategorySelector>

      <SupplierSelector
        supplier={supplier}
        onSelect={setSupplier}
        suppliers={suppliers}
        isLoading={isSuppliersLoading}
        style="px-4 py-2 mr-2 mb-2 rounded-lg"
      >
        <Text className="text-base text-gray-900 px-1 mb-2">Supplier</Text>
      </SupplierSelector>

      <ProductActions
        isSaving={isSaving}
        isDeleting={isDeleting}
        isEditMode={isEditMode}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </ScrollView>
  );
};

export default ProductFields;
