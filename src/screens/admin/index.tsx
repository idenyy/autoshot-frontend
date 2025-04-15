import { Text, TouchableOpacity, View } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { StatisticsBlock } from "@/components/ui/statistics";
import { AdminService } from "@/services/admin.service";
import { Tabs } from "@/components/ui/tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProductList } from "@/screens/admin/product/ProductList";
import { OrderList } from "@/screens/admin/order-list";
import { UserList } from "@/screens/admin/user-list";
import { TabsHeader } from "@/screens/admin/tabs-header";
import { useFilters } from "@/providers/filter.provider";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useState } from "react";
import { ProductModal } from "@/screens/admin/product/ProductModal";
import ProductFields from "@/screens/admin/product/ProductFields";

const Admin: React.FC = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => AdminService.getSummary(),
  });

  const queryClient = useQueryClient();
  const { top } = useSafeAreaInsets();
  const { activeTab, setActiveTab } = useFilters();
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <View style={{ paddingTop: top }} className="w-full h-full px-6">
      <View className="w-full h-full">
        <Text className="text-2xl text-center font-bold mb-4">
          Admin Dashboard
        </Text>

        <TabsHeader title={activeTab}>
          {activeTab === "Products" && (
            <TouchableOpacity
              className="p-2 bg-gray-100 rounded-lg"
              onPress={openModal}
            >
              <FontAwesome6 name="plus" size={20} color="#3b82f6" />
            </TouchableOpacity>
          )}
        </TabsHeader>

        <Tabs
          tabs={[
            {
              id: 0,
              title: "Products",
              content: <ProductList />,
            },
            {
              id: 1,
              title: "Orders",
              content: <OrderList />,
            },
            {
              id: 2,
              title: "Users",
              content: <UserList />,
            },
            {
              id: 3,
              title: "Statistic",
              content: <StatisticsBlock stats={stats} isLoading={isLoading} />,
            },
          ]}
          onTabChange={setActiveTab}
        />

        <ProductModal visible={isModalVisible} onClose={closeModal}>
          <View className="p-4">
            <Text className="text-xl text-center font-semibold mb-4">
              Add New
            </Text>
            <ProductFields
              onClose={closeModal}
              onUpdate={() => {
                queryClient.invalidateQueries({
                  queryKey: ["admin-product"],
                });
                closeModal();
              }}
            />
          </View>
        </ProductModal>
      </View>
    </View>
  );
};

export default Admin;
