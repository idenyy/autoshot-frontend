import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TypeRootStackParamList } from "@/navigation/navigation.types";
import React, { useMemo } from "react";
import { routes } from "@/navigation/routes";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/ui/header";
import Auth from "@/screens/auth";

const Stack = createNativeStackNavigator<TypeRootStackParamList>();

const PrivateNavigator: React.FC = () => {
  const { user } = useAuth();

  const screenOptions = useMemo(
    () => ({
      contentStyle: {
        backgroundColor: "#fff",
      },
    }),
    [],
  );

  const renderAuthenticatedRoutes = useMemo(
    () =>
      routes.map((route) => {
        const isExplore = route.name === "Explore";
        return (
          <Stack.Screen
            key={route.name}
            name={route.name as keyof TypeRootStackParamList}
            component={route.component}
            options={{
              headerShown: route.headerShown,
              ...(route.headerShown
                ? isExplore
                  ? { header: () => <Header /> }
                  : {
                      title: "",
                      headerBackTitleVisible: false,
                      headerTintColor: "#3b82f6",
                      headerStyle: {
                        backgroundColor: "#fff",
                      },
                      headerShadowVisible: false,
                    }
                : {}),
            }}
          />
        );
      }),
    [],
  );

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {user ? (
        renderAuthenticatedRoutes
      ) : (
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default React.memo(PrivateNavigator);
