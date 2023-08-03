import Taro from "@tarojs/taro";

export let GlobalEnv: any;
if (process.env.TARO_ENV == "weapp") {
  try {
    const accountInfo = Taro.getAccountInfoSync();
    GlobalEnv = accountInfo.miniProgram.envVersion;
    console.log("%c运行环境: " + GlobalEnv, "color: green");
  } catch (e) {
    GlobalEnv = "develop"; // 默认为开发环境
    console.log("%c获取运行环境失败! " + GlobalEnv, "color: red");
  }
}

export const isDev = GlobalEnv === "develop"; // 是否是开发环境

export const GlobalEvents = new Taro.Events(); // 全局事件
