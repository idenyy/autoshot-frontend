import { createContext, PropsWithChildren, useEffect, useState } from "react";
import {
  IContext,
  TypeUserState,
} from "@/providers/auth/auth-provider.interface";
import * as SplashScreen from "expo-splash-screen";
import { IUser } from "@/types/user.interface";
import { getAccessToken, getUser } from "@/services/auth/auth.helper";

export const AuthContext = createContext({} as IContext);

let ignore = SplashScreen.preventAutoHideAsync();

const AuthProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [user, setUser] = useState<TypeUserState>({} as IUser);

  useEffect(() => {
    let isMounted = true;

    const checkAccessToken = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();

        const accessToken = await getAccessToken();
        if (accessToken) {
          const user = await getUser();
          if (isMounted) setUser(user);
        }
      } catch {
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    checkAccessToken();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
