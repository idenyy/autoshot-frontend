import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import {
  EnumAsyncStorage,
  EnumSecureStore,
  IAuthResponse,
  ITokens,
} from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAccessToken = async () => {
  const accessToken = await getItemAsync(EnumSecureStore.ACCESS_TOKEN);
  return accessToken || null;
};

export const saveTokens = async (data: ITokens) => {
  await setItemAsync(EnumSecureStore.ACCESS_TOKEN, data.accessToken);
  await setItemAsync(EnumSecureStore.REFRESH_TOKEN, data.refreshToken);
};

export const deleteTokens = async () => {
  await deleteItemAsync(EnumSecureStore.ACCESS_TOKEN);
  await deleteItemAsync(EnumSecureStore.REFRESH_TOKEN);
};

export const getUser = async () => {
  try {
    return JSON.parse(
      (await AsyncStorage.getItem(EnumAsyncStorage.USER)) || "{}",
    );
  } catch {
    return null;
  }
};

export const saveToStorage = async (data: IAuthResponse) => {
  await saveTokens(data);

  try {
    await AsyncStorage.setItem(
      EnumAsyncStorage.USER,
      JSON.stringify(data.user),
    );
  } catch {
    return null;
  }
};
