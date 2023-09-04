import { get, post } from "@/request";
import { GetUserInfoApi } from "./model";

/** 获取用户信息 */
export const getUserInfoApi = () => get("/userInfo", {}, { isShowFailToast: true })

/** 更新用户手机号 */
export const postPhoneApi = (data: GetUserInfoApi) => post("/phone", { ...data }, { isShowFailToast: true })