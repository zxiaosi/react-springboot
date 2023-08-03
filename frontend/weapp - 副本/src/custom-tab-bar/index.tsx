import Taro from "@tarojs/taro";
import { useEffect } from "react";
import { AtTabBar } from "taro-ui";

interface Props {
  tabId?: number;
  tabList: any;
}

/**
 * 自定义 TabBar 组件
 */
const CustomTabBar = (props: Props) => {
  const { tabId = 0, tabList } = props;

  const handleClick = (value: number) => {
    Taro.setStorageSync("tabId", value);
    Taro.switchTab({ url: tabList[value].url });
  };

  return (
    <AtTabBar fixed tabList={tabList} current={tabId} onClick={handleClick} />
  );
};

export default CustomTabBar;
