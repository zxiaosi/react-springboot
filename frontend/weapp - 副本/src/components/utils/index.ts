import Taro from "@tarojs/taro";

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
