import MyNavBar from "@/components/myNavBar";
import { getNavBarHeight } from "@/utils";
import { View, Map, MapProps, Image } from "@tarojs/components";
import Taro, { useDidHide, useDidShow } from "@tarojs/taro";
import { useReady, useRouter } from "@tarojs/taro";
import { useEffect, useRef, useState } from "react";
import QQMapWX from '@/components/qqmap/qqmap-wx-jssdk.js';
import { LocationStore, QQMapKey } from "@/global";
import { setLocalSync } from "@/request/auth";
import guidance from "@/assets/images/guidance.png";
import mapMarker from "@/assets/images/marker.png";
import styles from "./index.module.scss";

interface MyMarker extends MapProps.marker {
  name?: string; // 标题
  address?: string; // 地址
}

let timer; // 获取小程序定位定时器
const qqmapsdk = new QQMapWX({ key: QQMapKey }); // 实例化API核心类
const { statusBarHeight, navHeight } = getNavBarHeight(); // 顶部状态栏高度

const Index = () => {
  const router = useRouter();

  const isClickMarker = useRef(false); // 是否点击了当前位置
  const [marker, setMarker] = useState<MyMarker>(); // 标记点信息
  const [location, setLocation] = useState({ latitude: 39.92, longitude: 116.46 });
  const [markerList, setMarkerList] = useState<MyMarker[]>([]); // 标记点列表
  const [isShowModal, setIsShowModal] = useState(false); // 是否显示弹窗

  const routerParams = JSON.parse(router?.params?.item || "{}");

  useReady(() => {
    console.log("routerParams", routerParams);
  })

  useDidShow(() => {
    timer = setTimeout(() => {
      getLocation();
    }, 500);
  })

  useDidHide(() => {
    timer && clearTimeout(timer);
  })

  useEffect(() => {
    const { latitude, longitude } = location;
    const newMarkers = [] as MyMarker[];

    for (let i = 0; i < 3; i++) {
      newMarkers.push({
        id: i,
        width: 30,
        height: 30,
        name: "标记点" + i,
        iconPath: mapMarker,
        latitude: latitude + handleRandom(),
        longitude: longitude + handleRandom(),
      })
    }
    setMarkerList(newMarkers);
  }, [location])

  /**
   * 获取当前位置
   * 1. 小程序 未授权地理位置信息
   * 2. 微信 未授权地理位置信息
   * 3. 手机 未开启定位
   */
  const getLocation = () => {
    Taro.getSetting({
      success: function (res) {
        const userLocation = res.authSetting['scope.userLocation'];

        if (!userLocation) {
          console.log("--小程序没有授权--", res);

          Taro.showModal({
            title: '小程序未授权地理位置信息',
            content: '是否前往设置页面手动开启',
            cancelText: '返回',
            confirmText: '去设置',
            success: function (res) {
              if (res.confirm) Taro.openSetting({})
              else Taro.navigateBack();
            }
          })
        } else {
          Taro.getLocation({
            type: 'gcj02', // wgs84
            success: function (res) {
              console.log("小程序已授权定位成功--", res);
              setLocalSync(LocationStore, res);
              setLocation({ ...res });
              timer && clearTimeout(timer);
            },
            fail: function (err) {
              const appAuth = Taro.getAppAuthorizeSetting();

              if (!appAuth.locationAuthorized) {
                console.log("微信没有授权--", err);

                Taro.showModal({
                  title: '微信未授权地理位置信息',
                  content: '是否前往设置页面手动开启',
                  cancelText: '返回',
                  confirmText: '去设置',
                  success: function (res) {
                    if (res.confirm) Taro.openAppAuthorizeSetting({});
                    else Taro.navigateBack();
                  }
                })
              } else {
                console.log("手机定位未开启--", err);

                Taro.showModal({
                  title: '手机定位未开启',
                  content: '请开启手机定位过再次进入此页面',
                  showCancel: false,
                  confirmText: '返回',
                  success: function (res) {
                    Taro.navigateBack();
                  }
                })
              }
            }
          })
        }
      },
      fail: function (err) {
        console.log("获取用户授权失败", err);
      }
    })
  }

  /**
   * 点击地图时触发
   */
  const handleTap = (e) => {
    if (!isClickMarker.current) {
      console.log("地图其他地方被点击", e);
    };
    isClickMarker.current = false;
  }

  /**
   * 点击标记点时触发
   */
  const handleMarkerTap = (e) => {
    isClickMarker.current = true;
    const newMarker = markerList[e.markerId];
    console.log("标记点被点击", newMarker);

    handleReverseGeocoder(newMarker.latitude, newMarker.longitude,
      (res) => {
        setIsShowModal(true);
        setMarker({ address: res.result.address, ...newMarker });
      },
      (err) => {
        setIsShowModal(false);
        Taro.showToast({ title: '逆地址解析失败', icon: 'none' });
      }
    );
  }

  /**
   * 计算随机值
   */
  const handleRandom = () => (Math.random() - 0.5) * 0.01;

  /**
   * 逆向地址解析
   * @param lat 纬度
   * @param lng 经度
   * @param success 成功回调
   * @param fail 失败回调
   */
  const handleReverseGeocoder = (lat: number, lng: number, success?: Function, fail?: Function) => {
    qqmapsdk.reverseGeocoder({
      location: { latitude: lat, longitude: lng },
      success: function (res) {
        console.log("逆地址解析", res);
        success?.(res);
      },
      fail: function (err) {
        console.log("逆地址解析失败", err);
        fail?.(err);
      }
    })
  }

  /**
   * 手机导航
   */
  const handleNavigation = (detail) => {
    const { name, latitude, longitude, address } = detail;
    Taro.openLocation({
      latitude,
      longitude,
      scale: 16,
      name,
      address,
      success: function (res) {
        console.log("打开手机导航", res);
      },
      fail: function (err) {
        console.log("打开手机导航失败", err);
      }
    })
  }

  return (
    <>
      <MyNavBar
        isUseBgColor={true}
        leftIcon="chevron-left"
        title={routerParams?.name}
        backFunc={() => Taro.navigateBack()}
      />

      <View className={styles.page}>
        <Map
          id="myMap"
          showLocation
          markers={markerList}
          longitude={location.longitude}
          latitude={location.latitude}
          style={{ width: "100%", height: `calc(100vh - ${(statusBarHeight + navHeight)}px)` }}
          onClick={handleTap}
          onMarkerTap={handleMarkerTap}
        />

        {
          isShowModal && <View className={styles.modal}>
            <View className={styles.left}>
              <View className={styles.title}>{marker?.name}</View>
              <View className={styles.address}>{marker?.address}</View>
            </View>
            <Image src={guidance} className={styles.right} onClick={() => handleNavigation(marker)} />
          </View>
        }
      </View>
    </>
  )

}

export default Index;