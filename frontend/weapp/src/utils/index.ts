import Taro from "@tarojs/taro";
import { MyRegEx } from "./constant";

let isUpdate = false; // 是否更新

/**
 * 版本更新提示
 */
export function checkUpdate() {
  const updateManager = Taro.getUpdateManager();

  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    console.log(`%c是否存在最新版本 ${res.hasUpdate}`, "color:yellow");

    if (!(res.hasUpdate && !isUpdate)) {
      isUpdate = true;

      // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.onUpdateReady(function () {
        console.log("%c小程序更新成功", "color:green");

        let timer1 = setTimeout(() => {
          updateManager.applyUpdate();
          isUpdate = false;
          clearTimeout(timer1);
        }, 1000);
      });

      updateManager.onUpdateFailed(function (res) {
        console.log(`%c小程序更新失败 ${res}`, "color:red");

        let timer2 = setTimeout(() => {
          isUpdate = false;
          // 提示 更新失败
          Taro.showToast({ title: "版本更新失败，请删除小程序重新进入" });
          clearTimeout(timer2);
        }, 1000);
      });

    }
  });
}

/**
 * 获取系统环境
 * @returns 系统环境 develop 开发环境 trial 体验版 release 正式版
 */
export function getSystemEnv() {
  let env = "develop";

  if (process.env.TARO_ENV != "weapp") return env; // 默认为开发环境

  try {
    const accountInfo = Taro.getAccountInfoSync();
    env = accountInfo.miniProgram.envVersion;
    console.log("%c运行环境: " + env, "color: orange");
  } catch (e) {
    console.log("%c获取运行环境失败! " + e, "color: red");
  }

  return env;
}

/**
 * 获取手机信息
 * @returns 手机信息 sysInfo 系统信息，capsuleInfo 胶囊信息
 */
export function getPhoneInfo() {
  let sysInfo = Taro.getSystemInfoSync(); //获取手机的信息
  let capsuleInfo = Taro.getMenuButtonBoundingClientRect(); //获取胶囊的信息
  return { sysInfo, capsuleInfo };
};

/**
 * 获取手机状态栏和导航栏高度
 * @returns 状态栏高度 statusBarHeight 导航栏高度 navHeight
 */
export function getNavBarHeight() {
  const {
    sysInfo,
    capsuleInfo: { width, height, top, right },
  } = getPhoneInfo(); // 获取手机信息

  const statusBarHeight = sysInfo.statusBarHeight || 20; // 状态栏高度

  const windowWidth = sysInfo.windowWidth; // 屏幕宽度

  const navHeight = height + (top - statusBarHeight) * 2; // 导航栏高度 = 胶囊高度 + (胶囊距离顶部高度 - 状态栏高度) * 2

  const capsuleMargin = windowWidth - right; // 返回导航距离右边宽度 = 屏幕宽度 - 胶囊距离右边宽度

  const capsuleSumWidth = width + capsuleMargin * 2; // 返回导航宽度 = 胶囊宽度 + (屏幕宽度 - 胶囊距离右边宽度) * 2

  return {
    statusBarHeight,
    navHeight,
    capsuleMargin,
    capsuleWidth: width,
    capsuleSumWidth,
  };
}

/**
 * 1. 判断手机机型是否为 Android | IPhone 
 * 2. 判断手机是否含有底部虚拟键
 * @param type Android | IPhone | HasNavigator
 */
export function checkPhoneModel(type: "Android" | "IPhone" | "HasNavigator") {
  const { system, model } = Taro.getSystemInfoSync();

  if (type == "Android") {
    return MyRegEx[type].test(system);
  } else {
    return MyRegEx[type].test(model);
  }
}