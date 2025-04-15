import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface Tab {
  id: number;
  title: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  onTabChange?: (title: string) => void;
}

export const Tabs = ({ tabs, onTabChange }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabPress = (tab: Tab) => {
    setActiveTab(tab.id);
    if (onTabChange) onTabChange(tab.title);
  };

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row mb-4"
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleTabPress(tab)}
              className={`px-4 py-2 rounded-full mr-2 ${
                isActive ? "bg-blue-500" : "bg-gray-200"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  isActive ? "text-white" : "text-gray-700"
                }`}
              >
                {tab.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View>{tabs[activeTab].content}</View>
    </View>
  );
};
