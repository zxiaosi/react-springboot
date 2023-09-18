import { get, post } from "@/request";
import { GetUserInfoApi, UpdateUserApi } from "./model";

/** 获取用户信息 */
export const getUserInfoApi = () => get("/userInfo", {})

/** 更新用户手机号 */
export const updatePhoneApi = (data: GetUserInfoApi) => post("/phone", { ...data })

/** 更新用户信息 */
export const updateUserApi = (data: UpdateUserApi) => post("/updateUser", { ...data })