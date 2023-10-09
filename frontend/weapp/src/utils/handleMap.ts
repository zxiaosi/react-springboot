import Taro from "@tarojs/taro";
import QQMapWX from "@/components/qqmap/qqmap-wx-jssdk.js";
import { QQMapKey } from "@/global";

// Taro.AuthSetting
type AuthName =
  | "scope.userLocation" // 精确地理位置
  | "scope.userFuzzyLocation" // 模糊地理位置
  | "scope.userLocationBackground" // 后台定位
  | "scope.record" // 麦克风
  | "scope.camera" // 摄像头
  | "scope.bluetooth" // 蓝牙
  | "scope.writePhotosAlbum" // 添加到相册
  | "scope.addPhoneContact" // 添加到联系人
  | "scope.addPhoneCalendar" // 添加到日历
  | "scope.werun" // 微信运动步数
  | "scope.address" // 通讯地址（已取消授权，可以直接调用对应接口）
  | "scope.invoiceTitle" // 发票抬头（已取消授权，可以直接调用对应接口）
  | "scope.invoice" // 获取发票（已取消授权，可以直接调用对应接口）
  | "scope.userInfo"; // 用户信息（小程序已回收，请使用头像昵称填写，小游戏可继续调用）

const qqmapsdk = new QQMapWX({ key: QQMapKey }); // 实例化API核心类

/**
 * 检查授权
 * @param name 权限名
 * @param successFunc 成功回调
 * @param failFunc 失败回调
 */
export function checkAuth(name: AuthName, successFunc?: Function, failFunc?: Function) {
  Taro.getSetting({
    success: (res) => {
      res.authSetting[name] ? successFunc?.(res) : failFunc?.(res);
    },
    fail: (err) => {
      console.error("获取权限设置失败--", err);
    },
  });
}

/**
 * 获取当前位置
 * 1. 小程序 未授权地理位置信息
 * 2. 微信 未授权地理位置信息
 * 3. 手机 未开启定位
 * @param successFunc 成功回调
 */
export function getLocation(successFunc?: Function) {
  checkAuth(
    "scope.userLocation",
    (result: Taro.getSetting.SuccessCallbackResult) => {
      Taro.getLocation({
        type: "gcj02", // wgs84
        success: function (res) {
          console.log("成功获取用户位置信息--", res);
          successFunc?.(res);
        },
        fail: function (err) {
          const appAuth = Taro.getAppAuthorizeSetting();

          if (!appAuth.locationAuthorized) {
            console.log("2. 微信 未授权地理位置信息--", err);

            Taro.showModal({
              title: "微信未授权地理位置信息",
              content: "是否前往设置页面手动开启",
              cancelText: "返回",
              confirmText: "去设置",
              success: function (res) {
                if (res.confirm) Taro.openAppAuthorizeSetting({});
                else Taro.navigateBack();
              },
            });
          } else {
            console.log("3. 手机 未开启定位--", err);

            Taro.showModal({
              title: "手机定位未开启",
              content: "请开启手机定位过再次进入此页面",
              showCancel: false,
              confirmText: "返回",
              success: function (res) {
                Taro.navigateBack();
              },
            });
          }
        },
      });
    },
    (result: Taro.getSetting.SuccessCallbackResult) => {
      console.log("--1. 小程序 未授权地理位置信息--", result);

      Taro.showModal({
        title: "小程序未授权地理位置信息",
        content: "是否前往设置页面手动开启",
        cancelText: "返回",
        confirmText: "去设置",
        success: function (res) {
          if (res.confirm) Taro.openSetting({});
          else Taro.navigateBack();
        },
      });
    }
  );
}

/**
   * 逆向地址解析
   * @param lat 纬度
   * @param lng 经度
   * @param success 成功回调
   * @param fail 失败回调
   */
export function handleReverseGeocoder(lat: number, lng: number, success?: Function, fail?: Function) {
  qqmapsdk.reverseGeocoder({
    location: { latitude: lat, longitude: lng },
    success: function (res) {
      console.log("逆地址解析", res);
      success?.(res);
    },
    fail: function (err) {
      console.log("逆地址解析失败", err);
      fail?.(err);
    },
  });
};