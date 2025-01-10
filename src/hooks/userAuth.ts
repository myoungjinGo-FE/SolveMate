import { StorageKeys } from "@/lib/utils/storage";

export const useAuth = () => {
  const setTokens = (access: string, refresh: string) => {
    localStorage.setItem(StorageKeys.ACCESS_TOKEN, access);
    localStorage.setItem(StorageKeys.REFRESH_TOKEN, refresh);
  };

  const clearTokens = () => {
    localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(StorageKeys.REFRESH_TOKEN);
  };

  return { setTokens, clearTokens };
};
