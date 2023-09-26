import { UserInfoStore } from "@/global";
import Taro from "@tarojs/taro";

/**
 * Taro.getStorageSync
 */
export function getLocalSync(Key?: string | undefined) {
  const local = Taro.getStorageSync(Key ? Key : UserInfoStore);
  return local || null;
}

/**
 * Taro.setStorageSync
 */
export function setLocalSync(Key?: string, params?: any) {
  Taro.setStorageSync(Key ? Key : UserInfoStore, params);
}
/**
 * Taro.removeStorageSync
 */
export function removeLocalSync(key?: string) {
  Taro.removeStorageSync(key ? key : UserInfoStore);
}

/**
 * Taro.clearStorageSync
 */
export function clearLocalSync() {
  Taro.clearStorageSync();
}
