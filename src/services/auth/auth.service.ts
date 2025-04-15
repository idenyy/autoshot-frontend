import { request } from "@/services/api/request.api";
import { EnumAsyncStorage, IAuthResponse } from "@/types/types";
import { getAuthUrl } from "@/config/api.config";
import { deleteTokens, saveToStorage } from "@/services/auth/auth.helper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthService = {
  async main(
    variant: "register" | "login",
    email: string,
    password: string,
    name?: string,
  ) {
    const response = await request<IAuthResponse>({
      url: getAuthUrl(`/${variant === "register" ? "register" : "login"}`),
      method: "POST",
      data: { name, email, password },
    });

    if (response.accessToken) await saveToStorage(response);

    return response;
  },

  async logout() {
    await deleteTokens();
    await AsyncStorage.removeItem(EnumAsyncStorage.USER);
  },
};
