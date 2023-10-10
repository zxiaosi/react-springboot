import { getNavBarHeight } from "@/utils";
import { View, MapProps, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useReady, useRouter } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { MapId } from "@/global";
import guidance from "@/assets/images/guidance.png";
import mapMarker from "@/assets/images/marker.png";
import styles from "./index.module.scss";
import MyMap from "@/components/myMap";
import { getLocation, handleReverseGeocoder } from "@/utils/handleMap";
import { AtIcon } from "taro-ui";
import MyLayout from "@/components/myLayout";

interface MyMarker extends MapProps.marker {
  name?: string; // 标题
  address?: string; // 地址
}

const { statusBarHeight, navHeight } = getNavBarHeight(); // 顶部状态栏高度

const Index = () => {
  const router = useRouter();

  const [markers, setMarkers] = useState<MyMarker[]>([]); // 标记点列表
  const [location, setLocation] = useState({
    latitude: 39.92, // 默认北京
    longitude: 116.46, // 默认北京
    isGet: false, // 是否获取到定位
  });
  const [modal, setModal] = useState({
    data: {} as MyMarker, // 标记点信息
    isShow: false, // 是否显示
  });

  const routerParams = JSON.parse(router?.params?.item || "{}");

  useReady(() => {
    console.log("routerParams", routerParams);
  });

  useEffect(() => {
    if (location.isGet) { // 获取到定位后才能获取附近的标记点
      const { latitude, longitude } = location;
      const newMarkers: MyMarker[] = [];

      for (let i = 0; i < 3; i++) {
        newMarkers.push({
          id: i,
          width: 30,
          height: 30,
          name: "标记点" + i,
          iconPath: mapMarker,
          callout: { content: "" } as any, // 取消真机点位上方的气泡
          latitude: latitude + handleRandom(),
          longitude: longitude + handleRandom(),
        });
      }

      setMarkers(newMarkers);
    }
  }, [location]);

  /**
   * 点击地图时触发
   */
  const handleTap = (e) => {
    setModal({ ...modal, isShow: false });
  };

  /**
   * 点击标记点时触发
   */
  const handleMarkerTap = (e) => {
    Taro.showLoading({ title: "正在解析地址..." });

    const newMarker = markers[e.markerId];

    handleReverseGeocoder(
      newMarker.latitude,
      newMarker.longitude,
      (res: any) => {
        Taro.hideLoading();
        setModal({
          data: { ...newMarker, address: res.result.address },
          isShow: true,
        });
      },
      (err: any) => {
        Taro.hideLoading();
        setModal({ ...modal, isShow: false });
        Taro.showToast({ title: "逆地址解析失败", icon: "none" });
      }
    );
  };

  /**
   * 获取位置信息回调
   */
  const handleLocaion = (res) => {
    // 这里可以将定位信息存入本地
    setLocation({ ...res, isGet: true });
  }

  /**
   * 计算随机值
   */
  const handleRandom = () => (Math.random() - 0.5) * 0.01;

  /**
   * 手机导航
   */
  const handleNavigation = (detail: MyMarker) => {
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
      },
    });
  };

  /**
   * 回到当前位置
   */
  const clickLocationBtn = () => {
    getLocation((res) => {
      setLocation(res)
      let mapCtx = Taro.createMapContext(MapId);
      mapCtx.moveToLocation(location);
    });
  }

  return (
    <MyLayout
      isUseBgColor={true}
      leftIcon="chevron-left"
      title={routerParams?.name}
      backFunc={() => Taro.navigateBack()}
    >
      <View className={styles.page}>
        <MyMap
          latitude={location.latitude}
          longitude={location.longitude}
          height={`calc(100vh - ${statusBarHeight + navHeight}px)`}
          markers={markers}
          onTap={handleTap}
          onMarkerTap={handleMarkerTap}
          successFunc={handleLocaion}
        />

        <View className={styles.rightBtn} onClick={() => { clickLocationBtn() }}>
          <AtIcon prefixClass='iconfont' value={"position"} className={styles.icon} />
        </View>

        {modal.isShow && (
          <View className={styles.modal}>
            <View className={styles.left}>
              <View className={styles.title}>{modal.data?.name}</View>
              <View className={styles.address}>{modal.data?.address}</View>
            </View>
            <Image
              src={guidance}
              className={styles.right}
              onClick={() => handleNavigation(modal.data)}
            />
          </View>
        )}
      </View>
    </MyLayout>
  );
};

export default Index;
