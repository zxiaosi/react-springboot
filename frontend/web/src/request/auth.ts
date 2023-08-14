import { AUTH_PREFIX } from "@/assets/js/global";

/*
 * 获取getItem
 * */
export function getLocal(Key?: string | undefined) {
  const local = localStorage.getItem(Key ? Key : AUTH_PREFIX);
  try {
    if (local) return JSON.parse(local);
  } catch (e) {
    return local || null;
  }
}

/*
 * 设置setItem
 * */
export function setLocal(Key?: string, params?: any) {
  if (params instanceof Object) params = JSON.stringify(params);
  localStorage.setItem(Key ? Key : AUTH_PREFIX, params);
}
/*
 * 移除removeItem
 * */
export function removeLocal(key?: string) {
  localStorage.removeItem(key ? key : AUTH_PREFIX);
}

/*
 * 清空所有Item
 * */
export function clearLocal() {
  localStorage.clear();
}
