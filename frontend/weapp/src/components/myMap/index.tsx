import { MapId } from '@/global';
import { getLocation } from '@/utils/handleMap';
import { Map, MapProps } from '@tarojs/components';
import { useDidHide, useDidShow } from '@tarojs/taro';
import { useRef } from 'react'
import styles from "./index.module.scss";

let timer: any; // 获取小程序定位定时器

interface MyMarker extends MapProps.marker {
  name?: string; // 标题
  address?: string; // 地址
}

interface Props {
  /** 纬度(默认北京) */
  latitude: number;

  /** 经度(默认北京) */
  longitude: number;

  /** 地图宽度 */
  width?: number | string;

  /** 地图高度 */
  height?: number | string;

  /** 标记点列表 */
  markers?: MyMarker[];

  /** 点击地图时触发 */
  onTap?: Function;

  /** 点击标记点时触发 */
  onMarkerTap?: Function;

  /** 在地图渲染更新完成时触发 */
  onUpdated?: Function;

  /** 视野发生变化时触发 */
  onRegionChange?: Function;

  /** 成功获取位置之后的回调 */
  successFunc?: Function
}

/**
 * 自定义地图组件
 * @param props {@link Props}
 */
function MyMap(props: Props) {
  const {
    latitude = 39.92, longitude = 116.46, width = "100vw", height = "100vh",
    markers, onTap, onMarkerTap, onUpdated, onRegionChange, successFunc
  } = props; // 指定默认值

  const isClickMarker = useRef(false); // 是否点击了标记点

  useDidShow(() => {
    timer = setTimeout(() => {
      getLocation((res) => {
        timer && clearTimeout(timer);
        successFunc?.(res);
      });
    }, 500);
  });

  useDidHide(() => {
    timer && clearTimeout(timer);
  });

  /**
   * 点击地图时触发
   */
  const handleTap = (e: any) => {
    if (!isClickMarker.current) onTap?.(e.detail);
    isClickMarker.current = false;
  }

  /**
   * 点击标记点时触发
   */
  const handleMarkerTap = (e: any) => {
    isClickMarker.current = true;
    onMarkerTap?.(e);
  }

  /**
   * 在地图渲染更新完成时触发
   */
  const handleUpdated = () => onUpdated?.();

  /**
   * 视野发生变化时触发
   */
  const handleRegionChange = () => onRegionChange?.();

  return (
    <Map
      id={MapId}
      style={{ width, height }}
      className={styles.map}
      latitude={latitude}
      longitude={longitude}
      showLocation
      markers={markers}
      onTap={handleTap}
      onMarkerTap={handleMarkerTap}
      onUpdated={handleUpdated}
      onRegionChange={handleRegionChange}
    />
  )
}

export default MyMap;