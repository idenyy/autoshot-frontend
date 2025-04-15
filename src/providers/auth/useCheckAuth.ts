import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getAccessToken } from "@/services/auth/auth.helper";
import { errorCatch } from "@/services/api/error.api";
import { EXPIRED_TOKEN_ERRORS } from "@/services/api/interceptors.api";
import { AuthService } from "@/services/auth/auth.service";
import { getItemAsync } from "expo-secure-store";
import { EnumSecureStore } from "@/types/types";
import { refreshTokens } from "@/services/api/helper-auth.api";

export const useCheckAuth = (routeName?: string) => {
  const { user, setUser } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const accessToken = await getAccessToken();

        if (!accessToken && user) {
          await AuthService.logout();
          if (isMounted) setUser(null);
          return;
        }

        if (accessToken) {
          try {
            await refreshTokens();
          } catch (error) {
            if (EXPIRED_TOKEN_ERRORS.has(errorCatch(error))) {
              await AuthService.logout();
              if (isMounted) setUser(null);
            }
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const checkRefreshToken = async () => {
      try {
        const refreshToken = await getItemAsync(EnumSecureStore.REFRESH_TOKEN);
        if (!refreshToken && user) {
          await AuthService.logout();
          if (isMounted) setUser(null);
        }
      } catch (error) {
        console.error("Refresh token check error:", error);
      }
    };

    if (routeName) {
      checkRefreshToken();
    }

    return () => {
      isMounted = false;
    };
  }, [routeName, user]);
};
