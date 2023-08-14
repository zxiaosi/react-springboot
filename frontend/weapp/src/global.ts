import Taro from "@tarojs/taro";
import { getSystemEnv } from "./utils";

// 系统环境
export const env = getSystemEnv();

const baseApi = {
  develop: "http://127.0.0.1:8081", // 开发版
  trial: "http://127.0.0.1:8081", // 体验版
  release: "https://zxiaosi.cn", // 正式版
};

// 请求路径
export const baseUrl = baseApi[env] + "/api";

// 默认登录页
export const loginUrl = "/pages/home/index";

// 本地缓存名字
export const tokenStorage = "userToken";
export const userInfoStorage = "userInfo";
export const locationStorage = "userLocation";

// 全局事件
export const GlobalEvents = new Taro.Events();
