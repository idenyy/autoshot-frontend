import Toast from "react-native-toast-message";
import axios, { AxiosRequestConfig } from "axios";
import { Platform } from "react-native";
import instance from "@/services/api/interceptors.api";

export const request = async <T>(config: AxiosRequestConfig) => {
  try {
    const response = await instance<T>({
      ...config,
      headers: {
        ...config.headers,
        "X-Device-Platform": Platform.OS,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      console.error("API Error:", message);

      Toast.show({
        type: "error",
        text1: "Request Failed",
        text2: message,
        visibilityTime: 4000,
      });
    }
    throw error;
  }
};
