import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { TabItem } from "taro-ui/types/tab-bar";
import MyNavBar from "@/components/myNavBar";
import CustomTabBar from "@/custom-tab-bar";
import { useEffect, useState } from "react";

interface MyTabItem extends Partial<TabItem> {
  url: string; // 跳转路径
}

const tabList: MyTabItem[] = [
  { title: "首页", iconType: "home", url: "/pages/home/index" },
  { title: "功能", iconType: "filter", url: "/pages/feature/index" },
  { title: "我的", iconType: "user", url: "/pages/user/index" },
];

const MyLayout = (props: any) => {
  const [tabId, setTabId] = useState(0); // 当前选中的 tab

  useEffect(() => {
    const storageTabId = Taro.getStorageSync("tabId") || 0;
    setTabId(storageTabId);

    return () => {
      console.log("MyLayout unmount");
      Taro.setStorageSync("tabId", 0);
    };
  }, []);

  return (
    <View>
      {/* 顶部导航栏 */}
      <MyNavBar title={tabList[tabId]?.title} />
      {/* <MyNavBar title="首页" leftIcon="chevron-left" /> */}

      {props.children}

      {/* 底部导航栏 */}
      <CustomTabBar tabId={tabId} tabList={tabList} />
    </View>
  );
};
export default MyLayout;
