import { AuthPrefix } from "@/assets/js/global";

/*
 * 获取getItem
 * */
export function getLocal(Key?: string | undefined) {
  const local = localStorage.getItem(Key ? Key : AuthPrefix);
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
  localStorage.setItem(Key ? Key : AuthPrefix, params);
}
/*
 * 移除removeItem
 * */
export function removeLocal(key?: string) {
  localStorage.removeItem(key ? key : AuthPrefix);
}

/*
 * 清空所有Item
 * */
export function clearLocal() {
  localStorage.clear();
}
