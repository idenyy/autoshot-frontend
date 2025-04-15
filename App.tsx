import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import Navigation from "@/navigation/navigation";
import AuthProvider from "@/providers/auth/auth.provider";
import Toast from "@/components/ui/toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FilterProvider } from "@/providers/filter.provider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SafeAreaProvider>
          <FilterProvider>
            <Navigation />
          </FilterProvider>
        </SafeAreaProvider>
      </AuthProvider>
      <StatusBar barStyle="dark-content" />
      <Toast />
    </QueryClientProvider>
  );
}
