import { ScrollView, View } from "@tarojs/components";
import MyNavBar, { MyNavBarProps } from "@/components/myNavBar";
import CustomTabBar, { CustomTabBarProps } from "@/custom-tab-bar";
import { ReactNode } from "react";
import { getNavBarHeight } from "@/utils";
import styles from "./index.module.scss";

const { statusBarHeight, navHeight } = getNavBarHeight(); // 顶部状态栏高度

/** tab列表 */
const tabList = [
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
    url: "/pages/mine/index",
  },
];

interface Props extends Partial<MyNavBarProps & CustomTabBarProps> {
  /** 当前 tabId */
  tabId: number;

  /** 额外的高度 */
  extraHeight?: string;

  /** MyLayout子组件 */
  children?: ReactNode;
}

/**
 * 自定义 Layout 组件: 顶部导航栏 + 页面内容 + 底部导航栏
 * @param props {@link Props}
 */
const MyLayout = (props: Props) => {
  const { tabId, leftIcon, navBarClass, extraHeight } = props;

  return (
    <View>
      {/* 顶部导航栏 */}
      <MyNavBar
        navBarClass={navBarClass}
        title={tabList[tabId]?.title}
        leftIcon={leftIcon ? "chevron-left" : ""}
      />

      {/* 
        页面内容 
        顶部导航栏((statusBarHeight + navHeight)px) + 底部tabBar(120rpx) + 安全区域(env(safe-area-inset-bottom))
      */}
      <ScrollView
        scrollY
        scrollWithAnimation
        style={{
          height: `calc(100vh - ${statusBarHeight + navHeight}px - 120rpx - env(safe-area-inset-bottom) - ${extraHeight})`,
        }}
      >
        {props?.children}
      </ScrollView>

      {/* 底部导航栏 */}
      <CustomTabBar tabList={tabList} />
    </View>
  );
};
export default MyLayout;
