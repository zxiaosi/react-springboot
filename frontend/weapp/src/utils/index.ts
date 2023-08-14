import Taro from "@tarojs/taro";

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
 * 微信线上版本更新检测
 */
export const checkUpdate = async () => {
  const updateManager = Taro.getUpdateManager();

  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    console.log("是否有新版本推送:", res.hasUpdate);
  });

  updateManager.onUpdateReady(function () {
    Taro.showModal({
      title: "更新提示",
      content: "新版本已经准备好，是否重启应用？",
      success: function (res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      },
    });
  });

  updateManager.onUpdateFailed(function () {
    // 新的版本下载失败
  });
};

/**
 * 获取手机信息
 * @returns 手机信息 sysInfo 系统信息，capsuleInfo 胶囊信息
 */
export const getPhoneInfo = () => {
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