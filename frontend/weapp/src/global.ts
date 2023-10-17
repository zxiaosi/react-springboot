import Taro from "@tarojs/taro";
import { getSystemEnv } from "./utils";

/** 系统环境 */
export const Env = getSystemEnv();

const BaseUrl = {
  /** 开发版 */
  develop: "http://127.0.0.1:8081",

  /** 体验版 */
  trial: "https://zxiaosi.cn",

  /** 正式版 */
  release: "https://zxiaosi.cn",
};

/** 请求路径 */
export const ApiUrl: string = BaseUrl[Env] + "/wxapi";

/** 图片路径 */
export const ImageUrl: string = BaseUrl[Env] + "/images/";

/** 默认登录页 */
export const LoginUrl: string = "/views/home/index";

/** 本地缓存名字 */
export const TokenStore: string = "userToken";
export const UserInfoStore: string = "userInfo";
export const LocationStore: string = "userLocation";

/** 全局事件 */
export const GlobalEvents = new Taro.Events();

/** 地图id(回到当前位置时用) */
export const MapId: string = "myMap";

/** 腾讯地图key */
export const QQMapKey: string = "xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx";

/** 服务通知模板id */
export const tmplId: string = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";