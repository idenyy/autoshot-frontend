import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TypeRootStackParamList } from "@/navigation/navigation.types";
import PrivateNavigator from "@/navigation/private-navigator";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useCheckAuth } from "@/providers/auth/useCheckAuth";
import BottomMenu from "@/components/layout/bottom-menu";

const Stack = createNativeStackNavigator<TypeRootStackParamList>();

const Navigation: React.FC = () => {
  const { user } = useAuth();
  const [currentRoute, setCurrentRoute] = useState<string | undefined>(
    undefined,
  );

  const navRef = useNavigationContainerRef();

  useEffect(() => {
    setCurrentRoute(navRef.getCurrentRoute()?.name);

    const listener = navRef.addListener("state", () =>
      setCurrentRoute(navRef.getCurrentRoute()?.name),
    );

    return () => {
      navRef.removeListener("state", listener);
    };
  }, []);

  useCheckAuth(currentRoute);

  return (
    <>
      <NavigationContainer ref={navRef}>
        <PrivateNavigator />
      </NavigationContainer>
      {user && currentRoute && (
        <BottomMenu nav={navRef.navigate} currentRoute={currentRoute} />
      )}
    </>
  );
};

export default Navigation;
