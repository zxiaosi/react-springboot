import { get } from "@/request";
import { GetUserInfoApi } from "./model";

/** 测试接口 */
export const getUserInfoApi = (data: GetUserInfoApi) => get("/user", { ...data }, { isNeedToken: false, isShowFailToast: true })