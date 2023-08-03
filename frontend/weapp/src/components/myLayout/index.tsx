import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { TabItem } from "taro-ui/types/tab-bar";
import MyNavBar from "@/components/myNavBar";
import CustomTabBar from "@/custom-tab-bar";
import { ReactNode, useEffect, useState } from "react";

interface MyTabItem extends Partial<TabItem> {
  url: string; // 跳转路径
}

const tabList: MyTabItem[] = [
  {
    title: "首页",
    iconType: "home",
    url: "/pages/home/index",
  },
  {
    title: "功能",
    iconType: "filter",
    url: "/pages/feature/index",
  },
  {
    title: "我的",
    iconType: "user",
    url: "/pages/user/index",
  },
];

interface Props {
  /** 当前 tabId */
  tabId: number;

  /** 是否显示返回图标  */
  leftIcon?: boolean;

  /** 子组件 */
  children?: ReactNode;
}

/**
 * 自定义 Layout 组件
 * @param props {@link Props}
 */
const MyLayout = (props: Props) => {
  const { tabId, leftIcon } = props;

  Taro.useDidShow(() => {
    // 获取不到 getTabBar
    // const pageObj = Taro.getCurrentInstance().page;
    // const tabbar = Taro.getTabBar(pageObj);
    // console.log("tabbar", tabbar);
  });

  return (
    <View>
      {/* 顶部导航栏 */}
      <MyNavBar
        title={tabList[tabId]?.title}
        leftIcon={leftIcon ? "chevron-left" : ""}
      />
      {/* <MyNavBar title="首页" leftIcon="chevron-left" /> */}

      {props.children}

      {/* 底部导航栏 */}
      <CustomTabBar tabList={tabList} />
    </View>
  );
};
export default MyLayout;
