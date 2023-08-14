import { userInfoStorage } from "@/global";
import Taro from "@tarojs/taro";

/*
 * Taro.getStorageSync
 * */
export function getLocalSync(Key?: string | undefined) {
  const local = Taro.getStorageSync(Key ? Key : userInfoStorage);
  return local || null;
}

/*
 * Taro.setStorageSync
 * */
export function setLocalSync(Key?: string, params?: any) {
  Taro.setStorageSync(Key ? Key : userInfoStorage, params);
}
/*
 * Taro.removeStorageSync
 * */
export function removeLocalSync(key?: string) {
  Taro.removeStorageSync(key ? key : userInfoStorage);
}

/*
 * Taro.clearStorageSync
 * */
export function clearLocalSync() {
  Taro.clearStorageSync();
}
