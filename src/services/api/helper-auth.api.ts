import { getItemAsync } from "expo-secure-store";
import { EnumSecureStore, IAuthResponse } from "@/types/types";
import axios from "axios";
import { API_URL, getAuthUrl } from "@/config/api.config";
import { saveToStorage } from "@/services/auth/auth.helper";

export const refreshTokens = async () => {
  try {
    const refreshToken = await getItemAsync(EnumSecureStore.REFRESH_TOKEN);

    const response = await axios.post<string, { data: IAuthResponse }>(
      API_URL + getAuthUrl("/refresh"),
      { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.data.accessToken) await saveToStorage(response.data);

    return response;
  } catch (e) {}
};
